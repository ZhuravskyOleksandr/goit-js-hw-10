import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('.time-input');
const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', runTimer);

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
        izitoast.error({
            title: 'Error',
            message: 'Illegal operation',
            position: 'topRight'
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