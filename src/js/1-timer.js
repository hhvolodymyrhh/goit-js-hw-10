"use strict";

//підключення бібліотеки для оформлення календаря імпуту(https://flatpickr.js.org/getting-started/#installation)
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const listenInput = document.querySelector("input#datetime-picker");
const listenButton = document.querySelector("button[data-start]");
//неактивна кнопка
listenButton.disabled = true;
//налаштування для бібліотеки календарю (https://flatpickr.js.org/options/)
let userSelectedDate;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
      const date = new Date();
      userSelectedDate = new Date(selectedDates);

//так як в змінних міститься час від початкової дати можна їх порівняти
        if (userSelectedDate.getTime() > date.getTime()){
            listenButton.disabled = false;
            console.log(userSelectedDate)
        } else {
          //ПОВІДОМЛЕННЯ https://marcelodolza.github.io/iziToast/#Start
          // window.alert("Please choose a date in the future");
         const iziWorning = iziToast.warning({
    title: 'Caution',
            message: 'Please choose a date in the future',
            titleColor: " rgba(255, 0, 0, 0.5)",
            titleSize: "18px",
            titleLineHeight: "20px",
            messageSize: "18px",
            messageLineHeight: "20px",
            backgroundColor: "rgba(102, 255, 51, 0.5)",
            position: "topRight",
    
});
        }
  },
};
//активація бібліотеки календарю на елементі інпут
flatpickr(listenInput, options);

                                        //надана ФУНКЦІЯ
//для переводу в час наданого числового проміжку 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");

//функція для відліку часу після натискання кнопки
const onClickButton = (event) => {
  //оновлення поточного часу в 
  const date = new Date();

  //при вибраній даті що більше за поточну
    if (userSelectedDate.getTime() > date.getTime())
    {
      //відключення взаємодії з елементами
      listenInput.disabled = true;
      listenButton.disabled = true;
      //перерахунок часу та запис у спан
      const dateDifference = convertMs(userSelectedDate - date);
      //функція для виведення двох цифер на таймері якщо там одна
      //потрібно приводити до строки бо цифри не мають довжини .length
      function addLeadingZero(value) {
        if (value.toString().length <= 1) {
          return value.toString().padStart(2, '0');
        } else { return value;}
      };
      
      dataDays.textContent = addLeadingZero(dateDifference.days);
      dataHours.textContent = addLeadingZero(dateDifference.hours);
      dataMinutes.textContent = addLeadingZero(dateDifference.minutes);
      dataSeconds.textContent = addLeadingZero(dateDifference.seconds);

      //РЕКУРСІЯ функції для повторення відрахунку часу
      setTimeout(onClickButton, 1000); 
      //при рівності дат приведення до початкового стану
    } else if (userSelectedDate.getFullYear() === date.getFullYear() && userSelectedDate.getHours() === date.getHours() && userSelectedDate.getMinutes() === date.getMinutes() && userSelectedDate.getSeconds() === date.getSeconds()) {
      dataDays.textContent = "00";
      dataHours.textContent = "00";
      dataMinutes.textContent = "00";
      dataSeconds.textContent = "00";
      listenInput.disabled = false;
      //перевірка чи час не сплив перед натисненням кнопки
      } else if (userSelectedDate.getTime() < date) {
      listenInput.disabled = true;
      //повідомлення https://marcelodolza.github.io/iziToast/#Start
      // window.alert("Please choose a date in the future");
      const iziWorning = iziToast.warning({
    title: 'Caution',
            message: 'Please choose a date in the future',
            titleColor: " rgba(255, 0, 0, 0.5)",
            titleSize: "18px",
            titleLineHeight: "20px",
            messageSize: "18px",
            messageLineHeight: "20px",
            backgroundColor: "rgba(102, 255, 51, 0.5)",
            position: "topRight",
});
  }
};

listenButton.addEventListener("click", onClickButton);