//declarations

let files;
let uploadedImage;

//canvas declarations

const canvas = document.querySelector("canvas");
const selectSplitValueInput = document.querySelector(
  ".select-split-value-input"
);
const splitImageButton = document.querySelector(".split-image-button");

const canvasDownloadImageLink = document.querySelector(
  ".canvas-download-image-link"
);

//upload image declarations

const imageInput = document.querySelector("#choose-file");
const imageDivContainer = document.querySelector(".image-div-container");

let uploadedImageContainer = document.querySelector(
  ".uploaded-image-container"
);

imageInput.addEventListener("change", uploadImage);

function uploadImage() {
  canvasContainerLinks.innerHTML = "";

  uploadedImageContainer.style.visibility = "visible";

  files = URL.createObjectURL(imageInput.files[0]);
  imageInput.name = "imageAdded";

  //upload Image

  uploadedImage = document.querySelector(".uploaded-img");
  uploadedImage.src = files;

  displayElements();
}

// display elements -:

function displayElements() {
  uploadedImage.style.display = "block";
  canvas.style.display = "none";
  splitImageButton.style.display = "block";
  selectSplitValueInput.style.display = "block";
}

// split image event listener
selectSplitValueInput.addEventListener("change", setCanvasProperties);
splitImageButton.addEventListener("click", setCanvasProperties);

//CANVAS CODE

let canvasContainerLinks = document.querySelector(".canvas-container-links");
let alreadyAddedDownloadLink = document.querySelector(
  ".half-image-download-links"
);

//set canvas width and height

function setCanvasProperties() {
  canvasContainerLinks.innerHTML = "";

  //setting split input value condition if 0

  if (selectSplitValueInput.value == "") {
    alert("please fill value greater than 0");
    canvas.style.display = "none";
    canvasDownloadImageLink.style.display = "none";
  } else {
    canvas.style.display = "block";
    canvasDownloadImageLink.style.display = "block";
  }

  //canvas width and height

  var c = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 500;

  let imgObj = new Image();
  imgObj.classList.add("imgObj");
  imgObj.src = files;
  imgObj.onload(createCanvasAndImage(c, imgObj));
}

//create canvas , image and split image functionality

function createCanvasAndImage(c, imgObj) {
  let w = canvas.width;
  let nw = imgObj.naturalWidth;
  let nh = imgObj.naturalHeight;
  let aspect = nw / nh;
  let h = w / aspect;
  canvas.height = h;

  let parts = selectSplitValueInput.value;
  let partWidth = nw / parts;200

  //Number of iteration in which image will be splitted

  for (let i = 0; i < parts; i++) {
    // w=> canvas width
    c.drawImage(
      imgObj,
      i * partWidth,
      0,
      partWidth,
      nh,
      i * (w / parts),
      0,
      w / parts + 60,
      h
    );

    //new canvas for downloading image

    let newCanvas = document.createElement("canvas");

    let ctx = newCanvas.getContext("2d");
    newCanvas.width = w / parts;
    newCanvas.height = h;

    ctx.drawImage(imgObj, i * partWidth, 0, partWidth, nh, 0, 0, w / parts, h);

    //creating download links for each splitted images

    let downloadLink = document.createElement("a");
    downloadLink.classList.add("half-image-download-links");
    downloadLink.download = `split_${i}.png`;
    downloadLink.href = newCanvas.toDataURL("image/png");
    downloadLink.innerText = `Download ${i + 1} half portion of image`;

    canvasContainerLinks.appendChild(downloadLink);
  }

  // full Image download

  const donwloadFullImage = canvas.toDataURL("image/png");
  canvasDownloadImageLink.href = donwloadFullImage;
}
