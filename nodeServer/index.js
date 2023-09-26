const io = require('socket.io')(8001, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Ensure this matches your client origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
    // console.log('New user:', name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    const name = users[socket.id];
    socket.broadcast.emit('receive', { message, name });
  });

  socket.on('disconnect', () => {
    const name = users[socket.id];
    if (name) {
      socket.broadcast.emit('user-left', name);
      delete users[socket.id];
    }
  });
});

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/your_database_name'; // Replace with your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error('MongoDB connection error:', err);
    return;
  }

  console.log('Connected to MongoDB');
  const db = client.db(); // Get a reference to your database
  // Now you can use the 'db' object to perform database operations
});
