document.addEventListener("DOMContentLoaded", async () => {
  try {
      // fetch user profile data
      const response = await fetch('/api/profile');
      
      if (response.ok) {
          const userData = await response.json();

          // display user profile information
          document.getElementById("username").textContent = userData.username;
          document.getElementById("email").textContent = userData.email;
          document.getElementById("phone").textContent = userData.phone;

          const foodHistoryList = document.getElementById("foodHistory");
          const foodHistoryTitle = document.getElementById("foodHistoryTitle");

          // if user have food upload history, display it
          if (userData.foodHistory && userData.foodHistory.length > 0) {
              userData.foodHistory.forEach(food => {
                  const listItem = document.createElement("li");
                  const link = document.createElement("a");
                  link.href = `/food-detail/${food.id}`;
                  link.textContent = food.name;
                  listItem.appendChild(link);
                  foodHistoryList.appendChild(listItem);
              });
          } else { 
          // if user have no food upload history, hide the food history section
              foodHistoryTitle.style.display = "none";
              foodHistoryList.style.display = "none";
          }
      } else {
          alert("Failed to load user profile. Please login.");
      }
  } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Network error. Please try again.");
  }
});