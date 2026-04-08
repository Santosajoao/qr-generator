document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector("img"),
    input = document.querySelector("input"),
    widthInput = document.querySelector("#width"),
    heightInput = document.querySelector("#height"),
    button = document.querySelector("button"),
    copyBtn = document.querySelector("#copyBtn"),
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
      copyBtn.style.display = "block";
    }
  });

  copyBtn.addEventListener("click", () => {
    copiarQRCode(image);
  });
});

function copiarQRCode(img) {
  if (!img.src) {
    alert("Gere um QR Code primeiro!");
    return;
  }

  fetch(img.src)
    .then((res) => res.blob())
    .then((blob) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]).then(() => {
        showAlert("QR Code copiado para o clipboard!", img.src);
      });
    })
    .catch((err) => {
      console.error("Erro ao copiar QR Code: ", err);
      alert("Erro ao copiar QR Code!");
    });
}

function showAlert(message, imageSrc) {
  const alertDiv = document.createElement("div");
  alertDiv.className = "custom-alert";
  alertDiv.innerHTML = `
    <div class="alert-content">
      <h3>✓ ${message}</h3>
      <img src="${imageSrc}" alt="QR Code Copiado" />
      <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
    </div>
  `;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 5000);
}

function copiarPix() {
  const chavePix =
    "00020126580014BR.GOV.BCB.PIX01368206d4ee-8368-43ad-b393-d439f3307ec25204000053039865802BR5925Joao Pedro Santos de Arau6009SAO PAULO62140510e6ksg0Dnec63041328";

  navigator.clipboard
    .writeText(chavePix)
    .then(() => {
      alert("Chave PIX copiada com sucesso! Cole no seu banco de preferência para fazer a doação. Muito obrigado!");
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
}
