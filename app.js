const form = document.querySelector("#generate-form");
const qr = document.querySelector("#qrcode");

const onSubmitHandler = (e) => {
  e.preventDefault();
  clearQR();

  const url = document.querySelector("#url").value;
  const size = document.querySelector("#size").value;

  console.log(url, size);

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        qr.querySelector("img").style.border = "1px solid white";
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) =>
  new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: "#000",
    colorLight: "#ffffff",
  });

const showSpinner = () => {
  document.querySelector("#spinner").style.display = "block";
};
const hideSpinner = () => {
  document.querySelector("#spinner").style.display = "none";
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    " bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 w-1/3 m-auto my-5 rounded";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.querySelector("#generated").appendChild(link);
};

const clearQR = () => {
  qr.innerHTML = "";
  const saveLink = document.querySelector("#save-link");
  if (saveLink) {
    saveLink.remove();
  }
};

hideSpinner();
form.addEventListener("submit", onSubmitHandler);
