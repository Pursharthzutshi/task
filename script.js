//declarations

let firstHalfImageSpan;
let secondHalfImageSpan;
let splitButton;

const imageInput = document.querySelector("#choose-file");
const imageDivContainer = document.querySelector(".image-div-container");

imageInput.addEventListener("change",test)


let uploadedImageContainer = document.querySelector(".uploaded-image-container");
let files 
let uploadedImage
function test(){

  

    files = URL.createObjectURL(imageInput.files[0])
    imageInput.name="imageAdded"

    //upload Image

    uploadedImage = document.querySelector(".uploaded-img");
    uploadedImage.style.background='url('+files+')' 
    uploadedImage.style.backgroundSize='cover'

    //image split button
    
    splitButton = document.querySelector(".split-image-button")
    splitButton.style.visibility="visible"
    // splitButton.innerHTML = "Split Image"

    uploadedImageContainer.appendChild(splitButton);

    splitButton.addEventListener("click",splitImage);

    // const imageSpan = document.querySelector()

    // if(span.url != undefined){
    //     document.body.removeChild(imageDivContainer)
    // }

    
    
    if(imageInput.name == "imageAdded"){
        imageDivContainer.style.display="none"
        imageInput.name="imageNotAdded"
    }else{
        uploadedImage.style.display="block"
    }
}

    
let secondHalf  

firstHalfImageSpan = document.querySelector(".image-span")
secondHalfImageSpan = document.querySelector(".image-span:nth-child(even)")


function splitImage(){
    
    // if(imageInput.name == "imageAdded"){
    //     imageDivContainer.style.display="none"
    //     imageInput.name="imageNotAdded"
    // }else{
    //     uploadedImage.style.display="block"
    // }
    imageDivContainer.style.display = "block"
    firstHalfImageSpan.style.background='url('+files+')'
    firstHalfImageSpan.style.backgroundSize='cover'


    secondHalfImageSpan.style.background='url('+files+')'
    secondHalfImageSpan.style.backgroundSize='cover'
    secondHalfImageSpan.style.left ="3%"
    


}

