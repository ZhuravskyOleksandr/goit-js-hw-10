import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
form.addEventListener('submit', onFormSubmit);

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(izitoast.success({
                    title: 'OK',
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    position: 'topRight',
                }));
            } else {
                reject(izitoast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${delay}ms`,
                    position: 'topRight',
                }));
            }
        }, delay);
    });
};

function onFormSubmit(event) {
    event.preventDefault();  
    
    const { delay, state } = form.elements;
    const inputDelay = delay.value;
    const radioState = state.value;

    createPromise(inputDelay, radioState)
        .then(data => data)
        .catch(err => err);
    
    event.currentTarget.reset();
};