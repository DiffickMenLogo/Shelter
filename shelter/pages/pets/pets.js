const check = document.querySelector('.burger-check');
const logoTitle = document.querySelector('.logo-title');
const logoSubtitle = document.querySelector('.logo-subtitle');
const nav = document.querySelector('.nav');
const sliderPets = document.querySelectorAll('.pets-item');
const popupWindow = document.querySelector('.b-popup');
var requestURL = '../../pages/pets.json';
var newHttps = 'https://dog.ceo/api/breeds/image/random';
let currentPage = 1;
const next = document.getElementById('next');
const nextAll = document.getElementById('next2');
const prevAll = document.getElementById('prev2');
const perv = document.getElementById('prev');
async function getDataPetsNext(){
    const response = await fetch(requestURL);
    const pets = await response.json();
    let mas = [];
    for(let i = 0; i < 6; i++){
        mas = mas.concat(pets);
    }
    nextPagination(mas);
}
async function getDataPetsPerv(){
    const response = await fetch(requestURL);
    const pets = await response.json();
    let mas = [];
    for(let i = 0; i < 6; i++){
        mas = mas.concat(pets);
    }
    pervPagination(mas);
}
async function getDataAllPetsNext(){
    const response = await fetch(requestURL);
    const pets = await response.json();
    let mas = [];
    for(let i = 0; i < 6; i++){
        mas = mas.concat(pets);
    }
    nextAllPlagination(mas);
}
async function getDataAllPetsPerv(){
    const response = await fetch(requestURL);
    const pets = await response.json();
    let mas = [];
    for(let i = 0; i < 6; i++){
        mas = mas.concat(pets);
    }
    pervAllPlagination(mas);
}
function showNumPage(arrayLength, endPage) {
    const pageNum = document.getElementById('num-page');
    const perv = document.getElementById('prev');
    const pervAll = document.getElementById('prev2');
    const next = document.getElementById('next');
    const nextAll = document.getElementById('next2');
    pageNum.innerHTML = currentPage;
    if(currentPage == 1){
        perv.classList.add('disabled');
        pervAll.classList.add('disabled');
        next.classList.remove('disabled');
        nextAll.classList.remove('disabled');
    }
    if(currentPage == 48 / arrayLength){
        next.classList.add('disabled');
        nextAll.classList.add('disabled');
        perv.classList.remove('disabled');
        pervAll.classList.remove('disabled');
    }
    if(currentPage != 1 && currentPage != 48 / arrayLength){
        next.classList.remove('disabled');
        nextAll.classList.remove('disabled');
        perv.classList.remove('disabled');
        pervAll.classList.remove('disabled');
    }
}
function nextPagination(mas) {
    const petsNames = document.querySelectorAll('.slider-name');
    let petImage = document.querySelectorAll('.slider-image');
    let arrayLength = 8;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 6;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 3;
    }
    if(currentPage == mas.length / arrayLength ){
        return
    }
    currentPage++;
    for (let i = 0; i < arrayLength; i++) {
        let index = mas.findIndex(e => e.name === petsNames[i].innerHTML);
        index += arrayLength;
        index %= 8;
        petImage[i].src = mas[index].img;
        petsNames[i].innerHTML = mas[index].name;
    };
    showNumPage(arrayLength);
}
function pervPagination(mas){
    const petsNames = document.querySelectorAll('.slider-name');
    const petImage = document.querySelectorAll('.slider-image');
    if(currentPage == 1){
        return;
    }
    currentPage--;
    let arrayLength = 8;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 6;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 3;
    }
    for (let i = 0; i < arrayLength; i++) {
        let index = mas.findIndex(e => e.name === petsNames[i].innerHTML);
        index += 8 - arrayLength;
        index %= 8;
        petImage[i].src = mas[index].img;
        petsNames[i].innerHTML = mas[index].name;
    };
    showNumPage(arrayLength);
}
function pervAllPlagination(mas){
    const petsNames = document.querySelectorAll('.slider-name');
    const petImage = document.querySelectorAll('.slider-image');
    if(currentPage == 1){
        return;
    }
    currentPage = 1;
    let arrayLength = 8;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 6;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 3;
    }
    index = 0;
    for (let i = 0; i < arrayLength; i++) {
        petImage[i].src = mas[index].img;
        petsNames[i].innerHTML = mas[index].name;
        index++;
    };
    showNumPage(arrayLength);
}
function nextAllPlagination(mas){
    const petsNames = document.querySelectorAll('.slider-name');
    const petImage = document.querySelectorAll('.slider-image');
    let arrayLength = 8;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 6;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 3;
    }
    if(currentPage == mas.length / arrayLength ){
        return
    }
    currentPage = mas.length / arrayLength;
    index = mas.length - 1;
    for (let i = 0; i < arrayLength; i++) {
        petImage[i].src = mas[index].img;
        petsNames[i].innerHTML = mas[index].name;
        index--;
    };
    showNumPage(arrayLength);
}
function changeBackground() {
    if (check.checked) {
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        nav.style.backgroundColor = '#292929';
        nav.style.position = 'fixed';
        nav.style.animation = 'slideInMenu 3s';
        logoTitle.style.color = '#F1CDB3';
        logoSubtitle.style.color = '#FFFFFF';
        nav.style.height = `${document.documentElement.clientHeight}px`;
    }else {
        nav.style.height = '';
        nav.style.backgroundColor = 'transparent';
        logoTitle.style.color = '#545454';
        logoSubtitle.style.color = '#292929';
        nav.style.position = '';
        nav.style.animation = 'none';
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.documentElement.style.scrollBehavior = 'smooth'
    }
}
document.addEventListener('click', (e) => {
    if(e.target.className != 'nav' && e.target.className != 'burger-check') {
        check.checked = false;
        changeBackground();
    };
});
async function getDataPopup(sliderPet) {
    const response = await fetch(requestURL);
    const pets = await response.json();
    popup(pets, sliderPet);
}
function popup(pets,sliderPet){
    const popupWindow = document.querySelector('.b-popup');
    const popupImage = document.querySelector('.popup-image');
    const popupName = document.querySelector('.popup-name');
    const popupDescription = document.querySelector('.popup-description');
    const popupType = document.querySelector('.popup-type');
    const popupListItem = document.querySelectorAll('.popup-list-item');
    popupWindow.style.display = 'flex';
    pets.forEach(pet => {
        if(sliderPet.children[1].innerHTML == pet.name){
            popupImage.src = pet.img;
            popupName.innerHTML = pet.name;
            popupType.innerHTML = pet.type;
            popupDescription.innerHTML = pet.description;
            popupListItem[0].innerHTML = `<b>Age</b> :${pet.age}`;
            popupListItem[1].innerHTML = `<b>Inoculations</b> :${pet.inoculations.join(', ')}`;
            popupListItem[2].innerHTML = `<b>Diseases</b> :${pet.diseases.join(', ')}`;
            popupListItem[3].innerHTML = `<b>Parasites</b> :${pet.parasites.join(', ')}`;
        }
    })
}
function exitPopupWindow() {
    popupWindow.style.display = 'none';
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.documentElement.style.scrollBehavior = 'smooth';
}
document.addEventListener('click', (e) => {
    if(e.target.className == 'b-popup' || e.target.className == 'exit-popup') {
        exitPopupWindow();
    };
});
sliderPets.forEach(sliderPet => {
    sliderPet.addEventListener('click', () => {
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        getDataPopup(sliderPet);
    })
})
nextAll.addEventListener('click', getDataAllPetsNext);
prevAll.addEventListener('click', getDataAllPetsPerv);
next.addEventListener('click',getDataPetsNext);
perv.addEventListener('click', getDataPetsPerv);
check.addEventListener('change', changeBackground);

