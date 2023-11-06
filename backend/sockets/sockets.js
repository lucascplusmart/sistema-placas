const socketIo = require('socket.io');
const socketioJwt = require('socketio-jwt');

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          allowedHeaders: ['x-auth-token'],
          credentials: true,
        },
      });
  
      io.use(socketioJwt.authorize({
        secret: process.env.SECRET_KEY,
        handshake: true
      }));
  
    io.on('connection', (socket) => {
      console.log('Novo cliente conectado:');
      
      socket.on('authentication_failed', (data) => {
        // Handle authentication failure as needed
      });
    
      socket.on('alerta', (mensagem) => {
        socket.emit('alerta', mensagem);
        // Handle the alert logic
      });
    
      socket.on('disconnect', () => {
      });
    });
  
    return io;
};
