import socketio from 'socket.io-client';

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  const socket = socketio('http://localhost/chat');
  Vue.prototype.$socket = socket;

  const socketUsers = socketio('http://localhost/users');
  Vue.prototype.$socketUsers = socketUsers;
}
