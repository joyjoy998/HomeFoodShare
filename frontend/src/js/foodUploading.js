document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  const photoInput = document.getElementById("photo");
  const imagePreview = document.getElementById("imagePreview");
  let imagesArray = [];

  photoInput.addEventListener("change", function (event) {
    const files = event.target.files;
    imagesArray = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        imagesArray.push(base64Image);
        displayImage(base64Image);
      };
      reader.readAsDataURL(file);
    });
  });

  function displayImage(base64Image) {
    const img = document.createElement("img");
    img.src = base64Image;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.margin = "5px";
    imagePreview.appendChild(img);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const foodData = localStorage.getItem("foodData")
      ? JSON.parse(localStorage.getItem("foodData"))
      : [];

    const formData = {
      id: foodData.length + 1,
      title: document.getElementById("title").value,
      tag: document.getElementById("tag").value,
      university: document.getElementById("university").value,
      description: document.getElementById("description").value,
      images: imagesArray,
    };

    foodData.push(formData);
    localStorage.setItem("foodData", JSON.stringify(foodData));

    alert("Data has been uploaded successfully!");
    window.location.href = "./home.html";
  });
});
