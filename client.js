const SOCKET_PORT = 8001;
const socketUrl = `${window.location.protocol}//${window.location.hostname}:${SOCKET_PORT}`;

const socket = io(socketUrl, {
  withCredentials: true,
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');

const audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
  messagecontainer.scrollTop = messagecontainer.scrollHeight;
  if (position === 'left') {
    audio.play().catch(() => {});
  }
};

const promptForName = () => {
  let name = '';
  while (!name) {
    const input = prompt('Enter your name to join chat');
    if (input === null) {
      return null;
    }
    name = input.trim();
    if (!name) {
      alert('Name cannot be empty.');
    }
  }
  return name;
};

const name = promptForName();
if (!name) {
  append('You must enter a name to join the chat. Refresh the page to try again.', 'left');
} else {
  socket.emit('new-user-joined', name);
}

socket.on('join-error', (errorMessage) => {
  append(errorMessage, 'left');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) {
    return;
  }
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

socket.on('user-joined', (joinedName) => {
  append(`${joinedName} joined the chat`, 'left');
});

socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('user-left', (leftName) => {
  append(`${leftName} left the chat`, 'left');
});
