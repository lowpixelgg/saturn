import { Namespace, Server } from 'socket.io';
import log from '@vendor/log';

export default class WhatsappDirectMessages {
  io: Namespace;
  users = [];
  namespace: string = '/game/phone';

  constructor(io: Server) {
    this.io = io.of(this.namespace);

    this.io.on('connection', socket => {
      const id = socket.handshake.query.id as any;

      this.users[id] = socket.id;

      log.info(`@ws/Phone: a new user connected: ${socket.id}`);

      socket.on('whats:onNewMessage', (phoneId, message) => {
        socket.to(this.users[phoneId]).emit('whats:onNewMessage', message);
        socket.emit('whats:onNewMessage', message);
      });
    });

    log.log(`@ws/Phone: Namespace "${this.namespace}" has been pushed up.`);

    this.io.on('disconnect', socket => {
      // if (this.users[socket.id]) {
      //   delete this.users[socket.id];
      // }
    });
  }
}
