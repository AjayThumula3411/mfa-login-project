"use strict";
const API = "http://localhost:5000";
// make functions global
window.register = async function () {
    await fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("rEmail").value,
            password: document.getElementById("rPass").value
        })
    });
    alert("Registered");
};
window.login = async function () {
    await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        })
    });
    alert("OTP sent (OTP sent to your email)");
};
window.verify = async function () {
    const res = await fetch(API + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            otp: document.getElementById("otp").value
        })
    });
    alert(await res.text());
};
