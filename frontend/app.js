"use strict";

const API = "http://localhost:5000"; // backend URL

//  REGISTER
async function register() {
    const res = await fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("rEmail").value,
            password: document.getElementById("rPass").value
        })
    });

    const data = await res.text();  //  get backend response
    alert(data);                    // show real message
}

//  LOGIN
async function login() {
    const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        })
    });

    const data = await res.text();  
    alert(data);                    // show real backend message
}

//  VERIFY OTP
async function verify() {
    const res = await fetch(API + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            otp: document.getElementById("otp").value
        })
    });

    const data = await res.text();
    alert(data);
}