const roomNameArea = document.querySelector('#room-name-area');
const specialRequirments = document.querySelector('#special-requirments');

let foundChatrooms = [];

const socket = io();

socket.on('connect', () => {
    console.log('User connected');
});

socket.on('chatroomList', chatrooms => {
    foundChatrooms = chatrooms;
});

const searchArea = document.getElementById('search-area-name');
const suggestionsList = document.querySelector('.suggestions-list');

searchArea.addEventListener('input', (e) => {
    const inputValue = searchArea.value.trim();
    suggestionsList.textContent = '';

    if (inputValue.length > 0) {
        const filteredChatrooms = filterChatrooms(inputValue);
        displaySuggestions(filteredChatrooms);
    }
});

function filterChatrooms(inputValue) {
    return foundChatrooms.filter(chatroom => chatroom.toLowerCase().includes(inputValue.toLowerCase()));
}

function displaySuggestions(chatrooms) {

    chatrooms.forEach(chatroom => {
        const suggestionItem = document.createElement('p');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = chatroom;
        suggestionsList.appendChild(suggestionItem);
        suggestionItem.addEventListener('click', () => {
            searchArea.value = chatroom;
            suggestionsList.textContent = '';
        });
    });
}

function passwordChecker(text) {
    for(let i=0; i<text.length; i++) {
        let code = text.charCodeAt(i);
        if(code === 32) {
            continue;
        }
        else if(code > 47 && code < 58) {
            continue;
        }
        else if(code > 64 && code < 91) {
            continue;
        }
        else if(code > 96 && code < 123) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
};

const createGrpBtn = document.querySelector('#create-grp-btn');
let isClickable = false;

roomNameArea.addEventListener('input', ()=> {
    const name = roomNameArea.value;
    if(name.length > 25) {
        specialRequirments.textContent = 'Name must not be greater than 25 characters';
        specialRequirments.style.display = 'block';
        createGrpBtn.style.backgroundColor = '#f7c396';
        createGrpBtn.style.cursor = 'default';
        isClickable = false;
    }
    else if(name[0] === ' ') {
        specialRequirments.textContent = 'Name must not start with a space';
        specialRequirments.style.display = 'block';
        createGrpBtn.style.backgroundColor = '#f7c396';
        createGrpBtn.style.cursor = 'default';
        isClickable = false;
    }
    else if(passwordChecker(name) === false) {
        specialRequirments.textContent = 'Name can contain only alphabets, numbers and spaces';
        specialRequirments.style.display = 'block';
        createGrpBtn.style.backgroundColor = '#f7c396';
        createGrpBtn.style.cursor = 'default';
        isClickable = false;
    }
    else if(name === '') {
        createGrpBtn.style.backgroundColor = '#f7c396';
        createGrpBtn.style.cursor = 'default';
        isClickable = false;
    }
    else {
        specialRequirments.style.display = 'none';
        createGrpBtn.style.backgroundColor = '#f78625';
        createGrpBtn.style.cursor = 'pointer';
        isClickable = true;
    }
});

createGrpBtn.addEventListener('click', ()=> {
    if(isClickable === true) {
        const groupName = roomNameArea.value;
        window.location.href = '/createChatroom';
        socket.emit('groupName', groupName);
    }
});