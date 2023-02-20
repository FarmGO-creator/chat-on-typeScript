"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const cardBody = document.querySelector('.card-body');
    const inputName = document.querySelector('[name="name"]');
    const inputText = document.querySelector('.text');
    const form = document.querySelector('form');
    let url = 'http://146.185.154.90:8000/messages';
    const message = yield fetch(url);
    const getMessage = yield message.json();
    const createEl = (item) => {
        cardBody.innerHTML += `
               <div class="message mb-3 bg-primary rounded-3 p-1">
                    <div class="boxes d-flex justify-content-between">
                        <div class="box">
                            <p><span class="fw-bold">Автор:</span> ${item.author}</p>
                        </div>
                        <div class="box">
                            <span class="fw-bold">${item.datetime}</span>
                        </div>
                    </div>
                    <p><span class="fw-bold">Сообщение: </span>${item.message}</p>
               </div>`;
    };
    for (const message of getMessage) {
        createEl(message);
    }
    let index = getMessage[getMessage.length - 1].datetime;
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const newUrl = yield fetch(`http://146.185.154.90:8000/messages?datetime=${index}`);
        const newJsn = yield newUrl.json();
        if (newJsn.length > 0) {
            index = newJsn[newJsn.length - 1].datetime;
            for (const user of newJsn) {
                createEl(user);
            }
        }
    }), 2000);
    form.addEventListener('submit', e => {
        e.preventDefault();
        const body = new URLSearchParams();
        body.append('author', inputName.value);
        body.append('message', inputText.value);
        fetch('http://146.185.154.90:8000/messages', { method: 'POST', body });
        inputName.value = '';
        inputText.value = '';
    });
});
run().catch(console.error);
