const userData = {
  _id: "66c98f569bdd23ddd6b176f1",
  username: "johndoe",
  email: "johndoe@uow.edu.au",
  password: "Qweasd123!",
  profilePicture: "https://robohash.org/dasdu127.png",
  created_date: new Date().toISOString(),
  phone: "1234567890",
};

localStorage.setItem("_id", userData._id);
localStorage.setItem("username", userData.username);
localStorage.setItem("email", userData.email);
localStorage.setItem("password", userData.password);
localStorage.setItem("profilePicture", userData.profilePicture);
localStorage.setItem("created_date", userData.created_date);
localStorage.setItem("phone", userData.phone);

console.log("User data has been stored in local storage.");
