// Express 
const express = require("express");
const app = express();

app.get("/home", function(request, response){
   response.send("Welcome to this server website");
})

app.listen(8080);


// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Fake validation (replace with backend later)
    if (email && password) {
      window.location.href = "main.html";
    }
  });
}

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Fake success
    window.location.href = "login.html";
  });
}
