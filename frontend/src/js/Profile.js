document.addEventListener("DOMContentLoaded", async () => {
  try {
      // fetch user profile data
      const response = await fetch('/api/profile');
      
      if (response.ok) {
          const userData = await response.json();

          // update user profile data on the page
          document.getElementById("username").textContent = userData.username;
          document.getElementById("email").textContent = userData.email;
          document.getElementById("phone").textContent = userData.phone;

          // update food history list
          const foodHistoryList = document.getElementById("foodHistory");
          userData.foodHistory.forEach(food => {
              const listItem = document.createElement("li");
              const link = document.createElement("a");
              link.href = `/food-detail/${food.id}`;
              link.textContent = food.name;
              listItem.appendChild(link);
              foodHistoryList.appendChild(listItem);
          });
      } else {
          alert("Failed to load user profile. Please login.");
      }
  } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Network error. Please try again.");
  }
});
