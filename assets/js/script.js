const cards = document.getElementById("cards");
const regionsSec = document.getElementById("regionsSec");
const searchInp = document.querySelector('input[type="search"]');
const randomCard = document.getElementById("randomCard");
const showBtn = document.getElementById("showBtn");

let cardsOnScreen = 12;
let activeRegion = null;

function showAll(show = data) {
    cardsOnScreen = 12
    printCards()
}

function fillRandomCard(region) {
    const list = region ? data.filter(item => item.region === region) : data;
    const item = list[Math.floor(Math.random() * list.length)];

    randomCard.innerHTML = `
        <div class="flex border rounded-md shadow-md bg-gray-50 text-gray-800">
        <a href= "./detail.html?name=${item.alpha3Code}">
                <img src="${item.flag}" alt="" class="object-cover object-center w-full rounded-t-md h-72 bg-gray-500">

        </a>
        <div class="flex flex-col justify-between p-6 space-y-8">
                <div class="space-y-2">
                    <span class="block text-xs font-medium tracking-widest uppercase text-violet-600">${item.region}</span>
                    <h2 class="text-3xl font-semibold tracking-wide truncate">${item.name}</h2>
                    <h2 class="text-2xl text-[#EF3340] font-semibold tracking-wide">${item.capital}</h2>
                    <p><b>Area:</b> ${item.area} km<sup>2</sup></p>
                    <p><b>Population:</b> ${item.population}</p>
                </div>
                <button class="w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 text-white">Read more</button>
            </div>
        </div>`;
}

function printCards(filData = data) {
    let kod = "";
    filData
    .slice(0, cardsOnScreen)
    .forEach(item => {
        kod += `
            <div class="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-800">
            <a href= "./detail.html?name=${item.alpha3Code}">
                <img src="${item.flag}" alt="" class="object-cover object-center w-full rounded-t-md h-72 bg-gray-500">
            </a>
                <div class="flex flex-col justify-between p-6 space-y-8">
                    <div class="space-y-2">
                        <span class="block text-xs font-medium tracking-widest uppercase text-violet-600">${item.region}</span>
                        <h2 class="text-3xl font-semibold tracking-wide truncate">${item.name}</h2>
                        <h2 class="text-2xl text-[#EF3340] font-semibold tracking-wide">${item.capital}</h2>
                        <p><b>Area:</b> ${item.area} km<sup>2</sup></p>
                        <p><b>Population:</b> ${item.population}</p>
                    </div>
                    <button class="w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 text-white">Read more</button>
                </div>
            </div>`;
    });
    cards.innerHTML = kod;
}

function getRegions() {
    const regionsArr = [...new Set(data.map(item => item.region))];
    regionsArr.forEach(item => {
        regionsSec.innerHTML += `
            <li onclick="filterByRegion('${item}')" class="flex cursor-pointer">
                <a class="flex items-center px-4 -mb-1 border-b-2 text-violet-600 border-violet-600">${item}</a>
            </li>`;
    });
}

function filterByRegion(region) {
    activeRegion = region;
    cardsOnScreen = 12;
    const filtered = data.filter(el => el.region === region);
    fillRandomCard(region); 
    printCards(filtered);
    showBtn.style.display = filtered.length > cardsOnScreen ? "inline-block" : "none";
}


function handleSearch() {
    let filteredData = data;
    if (activeRegion) {
        filteredData = filteredData.filter(item => item.region === activeRegion);
    }
    const searchData = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchInp.value.toLowerCase())
    );
    cardsOnScreen = 12;
    printCards(searchData);
    showBtn.style.display = searchData.length > cardsOnScreen ? "inline-block" : "none";
}

function showMore() {
    cardsOnScreen += 36;
    let currentData = data;
    if (activeRegion) {
        currentData = currentData.filter(el => el.region === activeRegion);
    }
    if (searchInp.value.trim() !== "") {
        currentData = currentData.filter(item =>
            item.name.toLowerCase().includes(searchInp.value.toLowerCase())
        );
    }
    printCards(currentData);
    if (currentData.length <= cardsOnScreen) {
        showBtn.style.display = "none";
    }
}

fillRandomCard();     
printCards();         
getRegions();         
