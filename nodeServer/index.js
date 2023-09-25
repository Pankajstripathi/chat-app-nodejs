// node server which will handle socket io connection

// const io = require('socket.io')(8000);
const io = require('socket.io')(8001, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    credentials: true, // Set this to true
  },
});

const users = {};
io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    console.log('new user', name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });
});
