document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // get user input
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // verify user input from frontend
      if (!username || !password) {
          alert("You must fill in all fields.");
          return;
      }

      // send data to backend
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: username,
                  password: password
              })
          });

          const result = await response.json();

          if (response.ok) {
              // login successful
              alert("Successfully log in.");
              window.location.href = "/profile";
          } else {
              // handle login error
              alert(result.message || "Login failed. Please make sure your have entered correct user name and password.");
          }
      } catch (error) {
          console.error("Error during login:", error);
          alert("Network error. Please try again.");
      }
  });
});
