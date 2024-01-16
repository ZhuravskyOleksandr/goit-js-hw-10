import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', runTimer);
startBtn.disabled = true;

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;

const calendar = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();   

      if (userSelectedDate < Date.now()) {
        startBtn.disabled = true;
        izitoast.error({
            title: '',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
    } else {
        startBtn.disabled = false;
      }
  }, 
});

function runTimer() {
    const intervalID = setInterval(() => {
        const timeDiff = userSelectedDate - Date.now();
        
        if (timeDiff > 0) {
            const { days, hours, minutes, seconds } = convertMs(timeDiff);

            daysSpan.textContent = addLeadingZero(days);
            hoursSpan.textContent = addLeadingZero(hours);
            minutesSpan.textContent = addLeadingZero(minutes);
            secondsSpan.textContent = addLeadingZero(seconds);

            startBtn.disabled = true;
        } else {
            clearInterval(intervalID);
        }
    }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};