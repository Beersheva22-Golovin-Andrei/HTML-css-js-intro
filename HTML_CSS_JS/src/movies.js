import moviesObj from '../movies.json' assert {type: 'json'};

const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");

const prefix = moviesObj.httpPrefix;
const itemsArr = moviesObj.results;
const detailsMain = document.querySelector("main");
const detailsSection = document.querySelector(".details-section");

const thumbnailsListElement = document.querySelector(".thumbnails-list");
const HIDDEN = "hidden";
const POINT = "point";

thumbnailsListElement.innerHTML =  buildBlockElements(itemsArr, prefix).join('');
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");

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


function buildBlockElements (itemsArr, prefix){
    const liElements = [];
    liElements.length = itemsArr.length;
    return [...liElements].map((n, index)=>n=`<li class="thumbnails-item">
                                        <a class="thumbnails-anchor" data-details-image="${(prefix+itemsArr[index].backdrop_path)}" data-details-text="${itemsArr[index].overview}">
                                            <img src="${(prefix+itemsArr[index].backdrop_path)}" class="thumbnails-image">
                                            <label class="thumbnails-title">${itemsArr[index].title}</label>
                                        </a>
                                    </li>`
); }

