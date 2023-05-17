const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");
const detailsMain = document.querySelector("main");
const detailsSection = document.querySelector(".details-section");
const HIDDEN = "hidden";
const POINT = "point"

thumbnailsAnchors.forEach(anc => anc.addEventListener('click', setDetails.bind(undefined, anc)));

function setDetails (anchor){
    showDetails();
    detailsImageElement.src = anchor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
}

function showDetails(){
    detailsMain.classList.remove(HIDDEN);
    detailsSection.classList.remove(POINT);
    
}

function hideDetails (){
    detailsMain.classList.add(HIDDEN);
    detailsSection.classList.add(POINT);
}