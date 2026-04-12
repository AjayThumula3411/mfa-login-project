import express from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import cors from "cors";

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

// REGISTER api
app.post("/register", async (req, res) => {  //receives registration data from frontend
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.query("INSERT INTO users(email,password) VALUES($1,$2)", [
    email,
    hash,
  ]);

  res.send("Registered");
});

// LOGIN api (generate OTP)
app.post("/login", async (req, res) => {  //receives login data from frontend
  const { email, password } = req.body;

//getr user input
  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  //fetch user from database
  if (!user) return res.send("User not found");

  //check if the user exists 
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.send("Wrong password");

//verify password
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //generate 6 digit otp
  await db.query("UPDATE users SET otp=$1 WHERE email=$2", [otp, email]);

  console.log("OTP:", otp);

  res.send("OTP sent");
});

// VERIFY api (OTP check
app.post("/verify", async (req, res) => { //receives OTP verification data from frontend
  const { email, otp } = req.body;

  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];

  if (user && user.otp === otp) {
    res.send("Login success");
  } else {
    res.send("Invalid OTP");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));