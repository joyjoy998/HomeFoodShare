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

      // regex to check if email is a valid university email for food/address safety reasons
      // as we only want the food share to be within university communities
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu\.au)$/;
      if (!emailPattern.test(email)) {
          alert("You must have a valid university email to sign up.");
          return;
      }

      // regex to validate password format
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(password)) {
          alert("Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
          return;
      }

      // check if password and confirm password match
      if (password !== confirmPassword) {
          alert("Passwords do not match.");
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
