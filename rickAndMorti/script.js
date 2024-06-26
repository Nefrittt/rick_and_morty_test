"use strict"



const charactersURL = 'https://rickandmortyapi.com/api/character';
const searchSpace = document.getElementById('searchSpace');
const searchBtn = document.getElementById('btnSearch');
const prevPage = document.getElementById('previosly');
const nextPage = document.getElementById('next');
const pageNum = document.querySelector('#pageNum');
const cardCollection = document.getElementById('card-collection')
var currentURL = 'https://rickandmortyapi.com/api/character'; // maybe delete


// functional for page borders
let page = 1;
let maxPages; // Максимальное кол-во страниц
pageNum.textContent = page + ' стр';

// Functions

function createCards(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => makeCards(data))

        console.log('Функция создания карточек отработала');
        function makeCards(obj) {
            maxPages = obj.info.pages; 
            obj.results.forEach(char => {
                cardCollection.innerHTML +=
                    `<div class="card">
                        <img src=${char.image} alt="Avatar" >
                        <div class="container">
                        <h4><b>${char.name}</b></h4>
                        <p>State: ${char.status}</p>
                        <p>Location: ${char.location.name}</p>
                        <p>Specie: ${char.species}</p>
                        </div>
                    </div>`
        
            });
        }
}
function next() {
    if(page < maxPages) {
        cardCollection.innerHTML = ''
        page++;
        currentURL = charactersURL + `?page=${page}&name=${searchSpace.value}`
        createCards(currentURL);
        pageNum.textContent = page + ' стр';
    }
}
function prev() {
    if(page > 1) {
        cardCollection.innerHTML = '';
        page--;
        currentURL = charactersURL + `?page=${page}&name=${searchSpace.value}`
        createCards(currentURL);
        pageNum.textContent = page + ' стр';
    }
}
function searching() {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchSpace.value}`)
        .then(response => response.json())
        .then(data => makeCards(data))

        cardCollection.innerHTML = '';
        page = 1;
        pageNum.textContent = page + ' стр';

        nextPage.addEventListener('click', next);
        prevPage.addEventListener('click', prev);

        // search function realise:
        function makeCards(obj) {
            maxPages = obj.info.pages; // Устанавливаем максимальное число страниц
            obj.results.forEach(char => {
                cardCollection.innerHTML +=
                    `<div class="card">
                        <img src=${char.image} alt="Avatar" >
                        <div class="container">
                        <h4><b>${char.name}</b></h4>
                        <p>State: ${char.status}</p>
                        <p>Location: ${char.location.name}</p>
                        <p>Specie: ${char.species}</p>
                        </div>
                    </div>`
        
            });
        } 
}
// Main

createCards(charactersURL); // наполняем сайт карточками при загрузке

// Search

searchBtn.addEventListener( 'click' , searching)

// Pagination:

if(searchSpace.value === '') {
    nextPage.addEventListener('click', next);
    prevPage.addEventListener('click', prev);
    
} else {
    nextPage.removeEventListener('click', next);
    prevPage.removeEventListener('click', prev);
}







