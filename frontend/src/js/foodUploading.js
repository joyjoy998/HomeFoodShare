document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  const photoInput = document.getElementById("photo");
  const imagePreview = document.getElementById("imagePreview");
  let imagesArray = [];

  // 处理图片选择
  photoInput.addEventListener("change", function (event) {
    const files = event.target.files;
    imagesArray = []; // 清空之前的图片数组
    imagePreview.innerHTML = ""; // 清空预览区域

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

  // 显示图片预览
  function displayImage(base64Image) {
    const img = document.createElement("img");
    img.src = base64Image;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.margin = "5px";
    imagePreview.appendChild(img);
  }

  // 处理表单提交
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
      imageUrl: imagesArray,
    };

    foodData.push(formData);

    // 检查 localStorage 的大小限制
    try {
      localStorage.setItem("foodData", JSON.stringify(foodData));
      // 显示成功消息
      alert("Data has been uploaded successfully!");
      window.location.href = "./home.html";
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        alert(
          "Storage limit exceeded. Please delete some old data or use fewer/smaller images."
        );
      } else {
        alert("An error occurred while saving the data.");
      }
    }
  });
});
