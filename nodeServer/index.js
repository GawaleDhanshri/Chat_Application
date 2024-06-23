// //node server which will handle socket io connections
// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket =>{
//     socket.on('new-user-joined', userName =>{
//         console.log("New user",userName);
//         users[socket.id]= userName;
//         socket.broadcast.emit('user-joined', userName);

//     });

//     socket.on('send', message =>{
//         socket.broadcast.emit('receive', {message: message, userName: users[socket.id]})
//     });

//     socket.on('send', message =>{
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });

// })



//node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Allow your client's origin
        methods: ["GET", "POST"] // Allowable methods
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        // console.log("New user", userName);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, userName: users[socket.id] });
    });

    // There seems to be a mistake in your original code with two 'send' events.
    // Assuming you meant 'disconnect' for user leaving:
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});