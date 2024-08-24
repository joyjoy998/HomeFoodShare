document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("resetButton");
  const submitButton = document.getElementById("submitButton");
  const homeIcon = document.getElementById("homeIcon");

  // Handle the reset button
  resetButton.addEventListener("click", () => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  });

  // Handle the submit button
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Get user input
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Verify user input from frontend
    if (!email || !password) {
      alert("You must fill in all fields.");
      return;
    }

    // Retrieve user data from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check if the input matches the stored data
    if (email === storedEmail && password === storedPassword) {
      // Login successful
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to home page
      alert("Successfully logged in.");
      window.location.href = "./home.html";
    } else {
      // Login failed
      alert("Incorrect email or password. Please try again.");
    }
  });

  // Handle the home icon click
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
