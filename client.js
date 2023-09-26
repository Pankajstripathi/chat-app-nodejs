// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8001', {
  withCredentials: true, // Add this line
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');

var audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
  if (position == 'left') {
    audio.play();
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});
const name = prompt('Enter your name to join chat');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
  //   console.log(`User joined: ${name}`);
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('user-left', (name) => {
  append(`${name}: left the chat`, 'left');
});
