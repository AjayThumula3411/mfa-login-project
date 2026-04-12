"use strict";
const API = "http://localhost:5000";    //Backend server url

async function register() {               //Runs when user clicks register button, sends email and password to backend to create account
    await fetch(API + "/register", {      //Sends email and password to backend to create account
        method: "POST",                    //Sends data to server
        headers: { "Content-Type": "application/json" },          //Tells server that data is in JSON format


        body: JSON.stringify({                                          //Converts email and password to JSON format to send to server
            email: document.getElementById("rEmail").value,               //Gets email from input field with id "rEmail"
            password: document.getElementById("rPass").value              //Gets password from input field with id "rPass"
        })
    });
    alert("Registered");  //Alerts user that registration was successfuls
}
async function login() {
    await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        })
    });
    alert("OTP sent (check backend terminal)");
}
async function verify() {
    const res = await fetch(API + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            otp: document.getElementById("otp").value
        })
    });
    alert(await res.text());
}
