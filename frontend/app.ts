const API: string = "http://localhost:5000";

// make functions global
(window as any).register = async function () {
  await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("rEmail") as HTMLInputElement).value,
      password: (document.getElementById("rPass") as HTMLInputElement).value
    })
  });

  alert("Registered");
};

(window as any).login = async function () {
  await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("pass") as HTMLInputElement).value
    })
  });

  alert("OTP sent (check backend terminal)");
};

(window as any).verify = async function () {
  const res = await fetch(API + "/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: (document.getElementById("email") as HTMLInputElement).value,
      otp: (document.getElementById("otp") as HTMLInputElement).value
    })
  });

  alert(await res.text());
};