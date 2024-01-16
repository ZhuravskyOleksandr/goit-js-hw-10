import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');
form.addEventListener('submit', onFormSubmit);

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
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
        .then(data => izitoast.success({
                    title: 'OK',
                    message: data,
                    position: 'topRight',
                }))
        .catch(err => izitoast.error({
                    title: 'Error',
                    message: err,
                    position: 'topRight',
                }));
    
    event.currentTarget.reset();
};