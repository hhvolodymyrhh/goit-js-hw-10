"use strict";

//бібліотека для відтворення повідомлення https://marcelodolza.github.io/iziToast/#Start
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// const delayInputEl = document.querySelector("input[name='delay']");
const formPromiseEl = document.querySelector("form");


const funcForInput = (event) => {
    event.preventDefault();
    const form = event.target;
   let delay = form.elements.delay.value;
    const radioResolve = form.elements.state.value;

    //проміс що відпрацьовує розширений
   const makePromise = (delayFrom, radioResolveFrom) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
           if (radioResolveFrom === "fulfilled") {
               //let value = delayFrom;
					resolve(delayFrom)
           } else {
               //let value = delayFrom;
					reject(delayFrom)
				}
			}, delayFrom);
         });
    };
    
// виклик функції промісу
    makePromise(delay, radioResolve)
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${value}ms`,
                messageColor: "#fff",
                messageSize: "18px",
                messageLineHeight: "20px",
                backgroundColor: "rgb(125, 218, 88)",
                position: "topRight", 
            });
            // добавити скруглення
const iziToastElStyle = document.querySelector(".iziToast");
            iziToastElStyle.style.borderRadius = '10px';
            iziToastElStyle.style.overflow = 'hidden';
            
        }
) 
	.catch(error => {
            iziToast.show({
                message: `❌ Rejected promise in ${error}ms`,
                messageColor: "#fff",
                messageSize: "18px",
                messageLineHeight: "20px",
                backgroundColor: "rgb(248, 108, 109)",
                position: "topRight",              
            });
            // добавити скруглення
const iziToastElStyle = document.querySelector(".iziToast");
            iziToastElStyle.style.borderRadius = '10px';
            iziToastElStyle.style.overflow = 'hidden';
        });
}

//виклик слухача на сабміті
formPromiseEl.addEventListener("submit", funcForInput);
