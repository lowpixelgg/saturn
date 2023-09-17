import { Namespace, Server } from 'socket.io';
import log from '@vendor/log';

export default class Voice {
  io: Namespace;
  namespace: string = '/voice';

  constructor(io: Server) {
    this.io = io.of(this.namespace);

    this.io.on('connection', socket => {
      log.info(`@ws/voice: a new user connected: ${socket.id}`);
    });

    log.log(`@ws/voice: Namespace "${this.namespace}" has been pushed up.`);
  }
}
