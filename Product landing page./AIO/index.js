const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { collection, addDoc, getDocs } = require("firebase/firestore");

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const socketIO = require('socket.io');
const { Console } = require("console");
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyBEK6UUJXmzfNMBW1gfJnWWdMNWsMhlLsQ",
    authDomain: "tactical-patrol-407107.firebaseapp.com",
    projectId: "tactical-patrol-407107",
    storageBucket: "tactical-patrol-407107.appspot.com",
    messagingSenderId: "433052903413",
    appId: "1:433052903413:web:25887c013847010a8aa2bc",
    measurementId: "G-DBTBEQDFTN"
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);

const initializeFirebase = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const readFirebase = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            return doc.data();
          });
    } catch (e) {
        console.error("Error getting data from document: ", e);
    }
};

let chatroomNames = [], groupChatroomName;



app.get('/joinChatroom', async (req, res) => {
    try {
        const chatroomsSnapshot = await getDocs(collection(db, "chatroom"));
        chatroomNames = [];
        chatroomsSnapshot.forEach(doc => {
            chatroomNames.push(doc.id);
        });

        res.render('joinChatroom', { chatroomNames });
    }
    catch(e) {
        console.error('Error retrieving chatrooms: ', e);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/createChatroom', (req, res) => {

    res.render('createChatroom', { groupChatroomName });
});

app.get('/chatroom/:roomName', (req, res) => {
    const roomName = req.params.roomName;
    res.render('chatroom.ejs', { roomName });
});

io.on('connection', socket => {
    console.log('A user connected');

    io.emit('chatroomList', chatroomNames);

    socket.on('groupName', groupName => {
        groupChatroomName = groupName;
    });

    io.emit('creatingGroup', groupChatroomName);

    socket.on('message', (message, roomName) => {
        io.to(roomName).emit('message', message);
    });

    socket.on('joinRoom', roomName => {
        socket.join(roomName);
        console.log(`User joined room ${roomName}`);
    });

    socket.on('disconnect', ()=> {
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    console.log("Home Request");
    res.render('home');
});

server.listen(3000, ()=> {
    console.log("Listening to port 3000");
})