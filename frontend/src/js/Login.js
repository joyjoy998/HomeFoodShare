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
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // get user input
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // verify user input from frontend
    if (!email || !password) {
      alert("You must fill in all fields.");
      return;
    }

    // send data to backend
    try {
      const response = await fetch(
        "https://ffpq4timf7.execute-api.ap-southeast-2.amazonaws.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (result.message === "Authentication successful") {
          // store logged in status in local storage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);

          // redirect to home page
          alert("Successfully logged in.");
          window.location.href = "./home.html";
        } else {
          // handle unexpected success response
          alert(result.message || "Unexpected response from server.");
        }
      } else {
        // handle login error based on the returned status code
        if (response.status === 401) {
          alert(result.message || "Incorrect password. Please try again.");
        } else if (response.status === 404) {
          alert(result.message || "User not found. Please check your email.");
        } else {
          alert(result.message || "Login failed. Please make sure you have entered the correct email and password.");
        }
      }
      
    } catch (error) {
      console.error("Error during login:", error);
      alert("Network error. Please try again.");
    }
  });

  // Handle the home icon click
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

});
