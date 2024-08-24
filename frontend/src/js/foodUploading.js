document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  const photoInput = document.getElementById("photo");
  const imagePreview = document.getElementById("imagePreview");
  let imagesArray = [];

  // 处理图片选择
  photoInput.addEventListener("change", function (event) {
    const files = event.target.files;
    imagesArray = []; // 清空之前的图片数组

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

    const formData = {
      title: document.getElementById("title").value,
      tag: document.getElementById("tag").value,
      university: document.getElementById("university").value,
      description: document.getElementById("description").value,
      images: imagesArray,
    };

    // 存储到 localStorage
    localStorage.setItem("foodUploadData", JSON.stringify(formData));

    // 显示成功消息
    alert("Data has been uploaded successfully!");
    window.location.href = "./home.html";
  });
});
