import express from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

//creating server
const app = express();  //creates server
app.use(express.json()); //allows server to read JSON data from frontend
app.use(cors()); //enables communication between frontend and backend

//database connection
const db = new Pool({    //pool manages multiple db conncetions efficiently
  user: "user",
  host: "localhost",
  database: "testdb",
  password: "pass",
  port: 5432,
});


//generate otp function
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


//nodemailer setup (to send email)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ajaythumula341@gmail.com", //your email
    pass: "gvjvagdrxbfmyibn",    //gmail app password
  },
});


//function to send otp to email
async function sendOTP(email: string, otp: string) {
  await transporter.sendMail({
    from: "ajaythumula341@gmail.com", // ✅ FIXED (must match your email)
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  });
}


// REGISTER api
app.post("/register", async (req, res) => {  //receives registration data from frontend
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10); //hash password

  await db.query("INSERT INTO users(email,password) VALUES($1,$2)", [
    email,
    hash,
  ]);

  res.send("Registered");
});


// LOGIN api (generate OTP)
app.post("/login", async (req, res) => {  //receives login data from frontend
  const { email, password } = req.body;

  //get user input
  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  //fetch user from database
  if (!user) return res.send("User not found");

  //check if the user exists 
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Wrong password");

  //verify password
  const otp = generateOTP(); //generate 6 digit otp

  //store otp in database
  await db.query("UPDATE users SET otp=$1 WHERE email=$2", [otp, email]);

  //send otp to email
  await sendOTP(email, otp);

  //console.log("OTP:", otp); //for testing

  res.send("OTP sent to email");
});


// VERIFY api (OTP check)
app.post("/verify", async (req, res) => { //receives OTP verification data from frontend
  const { email, otp } = req.body;

  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  //check if otp matches
  if (user && user.otp === otp) {

    // ✅ clear OTP after successful login
    await db.query("UPDATE users SET otp=NULL WHERE email=$1", [email]);

    // ❌ DO NOT COMPLETE LOGIN HERE
    // ✅ move to MFA step
    res.json({
      message: "OTP Verified",
      next: "MFA_REQUIRED"
    });

  } else {
    res.json({ message: "Invalid OTP" });
  }
});


// ================= GOOGLE MFA =================

// GENERATE QR CODE FOR GOOGLE AUTHENTICATOR
app.post("/mfa/setup", async (req, res) => {
  const { email } = req.body;

  const secret = speakeasy.generateSecret({
    length: 20,
  });

  // store secret in DB (reuse otp column for now)
  // ❌ removed wrong usage

  // ✅ store in mfa_secret column
  await db.query(
    "UPDATE users SET mfa_secret=$1, mfa_enabled=true WHERE email=$2",
    [secret.base32, email]
  );

  const qr = await QRCode.toDataURL(secret.otpauth_url!);

  res.json({ qr });
});


// VERIFY GOOGLE AUTHENTICATOR OTP
app.post("/mfa/verify", async (req, res) => {
  const { email, token } = req.body;

  const result = await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];

  const verified = speakeasy.totp({
    // ❌ old: user.otp
    // ✅ use mfa_secret
    secret: user.mfa_secret,
    encoding: "base32",
    token,
  });

  if (verified) {
    // ✅ FINAL LOGIN SUCCESS HERE
    res.send("🎉 Login Successful after MFA");
  } else {
    res.send("Invalid MFA Code");
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));