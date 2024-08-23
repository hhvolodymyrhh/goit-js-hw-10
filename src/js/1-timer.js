"use strict";
//підключення бібліотеки для оформлення календаря імпуту(https://flatpickr.js.org/getting-started/#installation)
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
      const date = Date.now();     

//так як в змінних міститься час від початкової дати можна їх порівняти
        if (selectedDates[0] > date)
        {
            listenButton.disabled = false;
            userSelectedDate = selectedDates[0];
          // console.log(selectedDates[0] - date)
          console.log(userSelectedDate)
        } else {
            window.alert("Please choose a date in the future");
            listenButton.disabled = true;
        };
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
  const date = Date.now();
  //при вибраній даті що більше за поточну
    if (userSelectedDate > date)
    {
      //відключення взаємодії з елементами
      listenInput.disabled = true;
      listenButton.disabled = true;
      //перерахунок часу та запис у спан
      const dateDifference = convertMs(userSelectedDate - date);
      dataDays.textContent = dateDifference.days;
      dataHours.textContent = dateDifference.hours;
      dataMinutes.textContent = dateDifference.minutes;
      dataSeconds.textContent = dateDifference.seconds;
      
      //РЕКУРСІЯ функції для повторення відрахунку часу
      setTimeout(onClickButton, 1000);         
    } else if (userSelectedDate === date) {
      dataDays.textContent = "0";
      dataHours.textContent = "00";
      dataMinutes.textContent = "00";
      dataSeconds.textContent = "00";
      listenInput.disabled = false;
      listenButton.disabled = false;
    } else {
      listenInput.disabled = false;
      listenButton.disabled = false;
      window.alert("Please choose a date in the future");
  }
};

listenButton.addEventListener("click", onClickButton);