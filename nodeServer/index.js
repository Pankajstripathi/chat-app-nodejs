const io = require('socket.io')(8001, {
  cors: {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    const displayName = typeof name === 'string' ? name.trim() : '';
    if (!displayName) {
      socket.emit('join-error', 'Please enter a valid name to join the chat.');
      return;
    }

    users[socket.id] = displayName;
    socket.broadcast.emit('user-joined', displayName);
  });

  socket.on('send', (message) => {
    const name = users[socket.id];
    if (!name) {
      return;
    }

    const text = typeof message === 'string' ? message.trim() : '';
    if (!text) {
      return;
    }

    socket.broadcast.emit('receive', { message: text, name });
  });

  socket.on('disconnect', () => {
    const name = users[socket.id];
    if (name) {
      socket.broadcast.emit('user-left', name);
      delete users[socket.id];
    }
  });
});

console.log('Chat server listening on http://localhost:8001');
