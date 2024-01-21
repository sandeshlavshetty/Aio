const socket = io();

socket.on('connect', () => {
    console.log('User connected');
});

let groupName;

socket.on('creatingGroup', createdgroupName => {
    groupName = createdgroupName;
});