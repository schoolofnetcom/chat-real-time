const io = require('socket.io')(80);

require('./src/chat/')(io);
require('./src/users/')(io);