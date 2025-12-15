// Импортируем нужные функции из файла utils.js
import { getMoscowTime, formatTime, isDayTime } from './utils.js';
import './main.scss';
import cat from "./assets/cat.jpg";

function updatePage() {
    const moscowDate = getMoscowTime();
    const formattedTime = formatTime(moscowDate);
    const hours = moscowDate.getHours();

    // Обновление текста на странице
    document.getElementById('current-time').textContent = 'Время в Санкт-Петербурге: ' + formattedTime;

    // Смена режима дня/ночи 
    const bodyElement = document.body;
    if (isDayTime(hours)) {
        bodyElement.classList.remove('night-mode');
        bodyElement.classList.add('day-mode');
    } else {
        bodyElement.classList.remove('day-mode');
        bodyElement.classList.add('night-mode');
    }
}

updatePage();

// Обновляем время каждую секунду
setInterval(updatePage, 1000);


let img = document.createElement('img');

img.src = cat;

img.width = 370;
img.height = 433;

let container = document.getElementById('image-container');
container.appendChild(img);
