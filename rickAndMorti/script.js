"use strict"



const charactersURL = 'https://rickandmortyapi.com/api/character';
const searchSpace = document.getElementById('searchSpace');
const searchBtn = document.getElementById('btnSearch');
const prevPage = document.getElementById('previosly');
const nextPage = document.getElementById('next');
const pageNum = document.querySelector('#pageNum');
const cardColection = document.getElementById('card-colection')
var currentURL = 'https://rickandmortyapi.com/api/character';

// functional for page borders
let page = 1;
if(page > 0 && page <= 42) {
    pageNum.textContent = page + ' стр';
};

// Functions
function getData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => makeCards(data.results))

        function makeCards(charArray) {
            charArray.forEach(char => {
                cardColection.innerHTML +=
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

function searching() {
    fetch(currentURL)
        .then(response => response.json())
        .then(data => filterChar(data.results))

        cardColection.innerHTML = '';
        console.log(currentURL);

        // search function realise:
        function filterChar(chars) {
            

            for(let char of chars) {
                let charName = char.name.toLowerCase();
                if(charName.includes(searchSpace.value.toLowerCase())) {
                    cardColection.innerHTML +=
                    `<div class="card">
                        <img src=${char.image} alt="Avatar" >
                        <div class="container">
                        <h4><b>${char.name}</b></h4>
                        <p>State: ${char.status}</p>
                        <p>Location: ${char.location.name}</p>
                        <p>Specie: ${char.species}</p>
                        </div>
                    </div>`
                }
            }
        }
}
// Main

getData(charactersURL);

// Search

searchBtn.addEventListener( 'click' , searching)

// Pagination:


nextPage.addEventListener('click', function() {
    if(page < 42) {
        cardColection.innerHTML = ''
        page++;
        currentURL = charactersURL + `?page=${page}`
        getData(currentURL);
        pageNum.textContent = page + ' стр';
    }
}) 

prevPage.addEventListener('click', function() {
    if(page > 1) {
        cardColection.innerHTML = '';
        page--;
        currentURL = charactersURL + `?page=${page}`
        getData(currentURL);
        pageNum.textContent = page + ' стр';
    }
})





