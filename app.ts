const run = async () => {
    type Per = {
        id: string;
        message: string;
        author: string;
        datetime: string;
    }


    const cardBody = document.querySelector('.card-body') !;

    const inputName: HTMLInputElement = document.querySelector('[name="name"]') !;
    const inputText: HTMLTextAreaElement = document.querySelector('.text') !;
    const form = document.querySelector('form') !;

    let url = 'http://146.185.154.90:8000/messages';
    const message = await fetch(url);
    const getMessage =  await message.json();


    const createEl = (item: Per) => {
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
               </div>`
    }

    for(const message of getMessage) {
        createEl(message);
    }

    let index = getMessage[getMessage.length - 1].datetime;

    setInterval(async () => {
        const newUrl = await fetch(`http://146.185.154.90:8000/messages?datetime=${index}`);
        const newJsn = await newUrl.json();

        if (newJsn.length > 0) {
            index = newJsn[newJsn.length - 1].datetime;

            for(const user of newJsn) {
                createEl(user)
            }
        }
    }, 2000)


    form.addEventListener('submit', e => {
        e.preventDefault();

        const body = new URLSearchParams();

        body.append('author', inputName.value);
        body.append('message', inputText.value);

        fetch('http://146.185.154.90:8000/messages', {method: 'POST', body});

        inputName.value = '';
        inputText.value = '';

    })
}

run().catch(console.error);