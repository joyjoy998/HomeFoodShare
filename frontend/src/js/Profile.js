const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");

document.getElementById("username").textContent = username;
document.getElementById("email").textContent = email;
document.getElementById("phone").textContent = phone;
