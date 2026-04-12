const API = "http://localhost:5000";   //backend server address

async function register() {
  await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("rEmail") as HTMLInputElement).value,
      password: (document.getElementById("rPass") as HTMLInputElement).value
    })
  });

  alert("Registered");
}

async function login() {
  await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("pass") as HTMLInputElement).value
    })
  });

  alert("OTP sent (check backend terminal)");
}

async function verify() {
  const res = await fetch(API + "/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("email") as HTMLInputElement).value,
      otp: (document.getElementById("otp") as HTMLInputElement).value
    })
  });

  alert(await res.text());
}