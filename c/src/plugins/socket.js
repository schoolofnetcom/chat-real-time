import socketio from 'socket.io-client';

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  const socket = socketio('http://localhost');
  Vue.prototype.$socket = socket;
}
