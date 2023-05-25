let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server);
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
