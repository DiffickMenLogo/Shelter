const check = document.querySelector('.burger-check');
const nav = document.querySelector('.nav');
const sliderPets = document.querySelectorAll('.slider-item');
const popupWindow = document.querySelector('.b-popup');
const next = document.getElementById('next');
const perv = document.getElementById('perv');
var requestURL = '../../pages/pets.json';
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

async function getDataNext() {
    const response = await fetch(requestURL);
    const pets = await response.json();
    changeImageSliderNext(pets);
    slideIn();
}
async function getDataPerv() {
    const response = await fetch(requestURL);
    const pets = await response.json();
    changeImageSliderPerv(pets);
    slideOff();
}
function slideIn(){
    sliderPets.forEach(sliderPet => {
        sliderPet.classList.toggle('animateIn');
        setTimeout(() => {
            sliderPet.classList.toggle('animateIn');
        },1000);
    })
}
function slideOff(){
    sliderPets.forEach(sliderPet => {
        sliderPet.classList.toggle('animateOff');
        setTimeout(() => {
            sliderPet.classList.toggle('animateOff');
        },1000);
    })
}
function changeImageSliderNext(pets) {
    let arrayLength = 3;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 2;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 1;
    }
    let petImage = document.querySelectorAll('.slider-image');
    let petName = document.querySelectorAll('.slider-name');
    for (let i = 0; i < arrayLength; i++) {
        let index = pets.findIndex(e => e.name === petName[i].innerHTML);
        index += arrayLength;
        index %= 8;
        petImage[i].src = pets[index].img;
        petName[i].innerHTML = pets[index].name;
    };
}
function changeImageSliderPerv(pets) {
    let arrayLength = 3;
    if (document.documentElement.clientWidth < 1279 && document.documentElement.clientWidth > 767) {
        arrayLength = 2;
    }
    else if (document.documentElement.clientWidth < 767) {
        arrayLength = 1;
    }
    let petImage = document.querySelectorAll('.slider-image');
    let petName = document.querySelectorAll('.slider-name');
    for (let i = 0; i < arrayLength; i++) {
        let index = pets.findIndex(e => e.name === petName[i].innerHTML);
        index += 8 - arrayLength;
        index %= 8;
        petImage[i].src = pets[index].img;
        petName[i].innerHTML = pets[index].name;
    };
}
next.addEventListener('click', getDataNext);
perv.addEventListener('click', getDataPerv);


function changeBackground() {
    if (check.checked) {
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        nav.style.backgroundColor = '#292929';
        nav.style.position = 'relative';
        nav.style.animation = 'slideInMenu 3s';
        nav.style.position = 'absolute';
        nav.style.height = '100%';
    }else {
        nav.style.backgroundColor = 'transparent';
        nav.style.position = '';
        nav.style.animation = 'none';
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}
document.addEventListener('click', (e) => {
    if(e.target.className != 'nav' && e.target.className != 'burger-check') {
        check.checked = false;
        changeBackground();
    };
});
check.addEventListener('change', changeBackground);



