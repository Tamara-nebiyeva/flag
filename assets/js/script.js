const cards = document.getElementById("cards")
const regionsSec = document.getElementById("regionsSec")
const searchInp = document.querySelector('input[type="search"]')
const randomCard = document.querySelector('#randomCard')
let cardsOnScreen = 12
let activeRegion = null


function fillRandomCard() {
    let randomFlag = data[Math.floor(Math.random() * data.length)];
    
    randomCard.innerHTML = `<div class="flex border rounded-md shadow-md bg-gray-50 text-gray-800">
            <img src="${randomFlag.flag}" alt="" class="object-cover object-center w-full rounded-t-md h-72 bg-gray-500">
            <div class="flex flex-col justify-between p-6 space-y-8">
                <div class="space-y-2">
                    <span class="block text-xs font-medium tracking-widest uppercase text-violet-600">${randomFlag.region}</span>
                    <h2 class="text-3xl font-semibold tracking-wide truncate">${randomFlag.name}</h2>
                    <h2 class="text-2xl text-[#EF3340] font-semibold tracking-wide"> ${randomFlag.capital}</h2>
                    <p class="text-gray-800"><b>Area :</b> ${randomFlag.area} km<sup>2</sup></p>
                    <p class="text-gray-800"><b>Population :</b> ${randomFlag.population}</p>
                </div>
                <button type="button" class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 dark:text-gray-50">Read more</button>
            </div>
        </div>`
}
fillRandomCard()

function printCards(filData = data) {
    let kod = ``
    filData
        .slice(0, cardsOnScreen)
        .forEach(item => kod += `<div class="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-800">
            <img src="${item.flag}" alt="" class="object-cover object-center w-full rounded-t-md h-72 bg-gray-500">
            <div class="flex flex-col justify-between p-6 space-y-8">
                <div class="space-y-2">
                    <span class="block text-xs font-medium tracking-widest uppercase text-violet-600">${item.region}</span>
                    <h2 class="text-3xl font-semibold tracking-wide truncate">${item.name}</h2>
                    <h2 class="text-2xl text-[#EF3340] font-semibold tracking-wide"> ${item.capital}</h2>
                    <p class="text-gray-800"><b>Area :</b> ${item.area} km<sup>2</sup></p>
                    <p class="text-gray-800"><b>Population :</b> ${item.population}</p>
                </div>
                <button type="button" class="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 dark:text-gray-50">Read more</button>
            </div>
        </div>`)
    cards.innerHTML = kod
}
printCards()

const regionsArr = [...new Set(data.map(item => item.region))]

function getRegions() {
    regionsArr.forEach(item => {
        regionsSec.innerHTML += `
            <li onclick="filterByRegion('${item}')" class="flex">
                <a rel="noopener noreferrer" href="#"
                    class="flex items-center px-4 -mb-1 border-b-2 text-violet-600 border-violet-600">${item}</a>
            </li>
        `
    })
}
getRegions()

function filterByRegion(region) {
    activeRegion = region
    cardsOnScreen = 12
    const filtered = data.filter(el => el.region === region)
    printCards(filtered)
}

function handleSearch() {
    let filteredData = data
    if (activeRegion) {
        filteredData = data.filter(item => item.region === activeRegion)
    }
    const searchData = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchInp.value.toLowerCase())
    )
    cardsOnScreen = 12
    printCards(searchData)
}


function showMore() {
    cardsOnScreen += 36
    let currentData = data
    if (activeRegion) {
        currentData = data.filter(el => el.region === activeRegion)
    }
    if (searchInp.value.trim() !== "") {
        currentData = currentData.filter(item =>
            item.name.toLowerCase().includes(searchInp.value.toLowerCase())
        )
    }
    printCards(currentData)
    if (currentData.length <= cardsOnScreen) {
        showBtn.style.display = "none"
        cardsOnScreen = 250
    }
}
