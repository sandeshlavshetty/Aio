const socket = io();

const button = document.querySelector('#submit');
const messageList = document.querySelector('#message-list');

function randColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

let color = randColor();

button.addEventListener('click', (e) => {
    e.preventDefault();
    let message = document.querySelector('#message').value;
    if(message !== '') {
        socket.emit('message', message);
    }
    message = '';
});

// socket.on('message', (message) => {
//     const li = document.createElement('li');
//     li.textContent = message;
//     li.style.color = color;
//     messageList.appendChild(li);
// });