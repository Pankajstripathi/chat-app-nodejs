// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8001', {
  withCredentials: true, // Add this line
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
};

const name = prompt('Enter your name to join chat');
socket.emit('new-user-joined', name);

// socket.on('user-joined', (name) => {
//   append(`${name} joined the chat`, 'right');
// });
// socket.on('user-joined', (name) => {
//     console.log(`User joined: ${name}`);
//   append(`${name} joined the chat`, 'left'); // Check if this function is being called
// });

// socket.on('receive', (data) => {
//   append(`${data.message}: ${data.user}`, 'right');
// });
socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'right'); // Use data.name to get the sender's name
});
