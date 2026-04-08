document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector("img"),
      input = document.querySelector("input"),
      widthInput = document.querySelector("#width"),
      heightInput = document.querySelector("#height"),
      button = document.querySelector("button"),
      api = `https://api.qrserver.com/v1/`,
      api2 = `create-qr-code/?size=`,
      api3 = `&data=`;
  
    button.addEventListener("click", () => {
      let data = input.value;
      let width = widthInput.value;
      let height = heightInput.value;
      if (data.length > 0 && width > 0 && height > 0) {
        let size = `${width}x${height}`;
        image.src = `${api}${api2}${size}${api3}${data}`;
      }
    });
  });
  