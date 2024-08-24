document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // get user input
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // verify user input from frontend
      if (!username || !email || !phone || !password || !confirmPassword) {
          alert("You must fill in all fields");
          return;
      }

      if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
      }

      // send data to backend
      try {
          const response = await fetch('/api/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: username,
                  email: email,
                  phone: phone,
                  password: password
              })
          });

          const result = await response.json();

          if (response.ok) {
              // signup successful
              alert("Signup successful. Please login.");
              window.location.href = "/login";
          } else {
              // handle signup error
              alert(result.message || "Failed to signup. Please try again.");
          }
      } catch (error) {
          console.error("Error during signup:", error);
          alert("Network error. Please try again.");
      }
  });
});
