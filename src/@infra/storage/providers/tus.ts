import { Injectable, Logger, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { resolve } from 'path';
import { cwd } from 'process';
import { Server, FileStore, EVENTS } from 'tus-node-server';

@Injectable({ scope: Scope.REQUEST })
export class Tus {
  private readonly logger = new Logger(Tus.name);
  private readonly tusServer = new Server();

  constructor() {
    this.tusServer.datastore = new FileStore({
      path: '/resources',
      directory: resolve(cwd(), 'storage'),
      namingFunction: this.namingMethod.bind(this),
    });
    this.tusServer.on(EVENTS.EVENT_UPLOAD_COMPLETE, (e) => {
      this.logger.log(`Upload complete for file ${e?.file?.id}`);
    });
  }

  private namingMethod(req: any) {
    const meta = this.getFileMetadata(req);
    this.logger.log(`Generating name for file ${meta.filename}`);
    const prefix = randomUUID();
    return meta.extension ? prefix + '.' + meta.extension : prefix;
  }

  private getFileMetadata(req: any) {
    const uploadMetadata = req.header('Upload-Metadata') as string;
    this.logger.debug('File metadata ' + uploadMetadata);

    const metadata = uploadMetadata.split(',')
      .reduce((acc, i) => {
        const [key, value] = i.split(' ');
        acc[key] = Buffer.from(value, 'base64').toString('ascii');
        return acc;
      }, {} as Record<string, string>);

    this.logger.debug('Parsed metadata ' + JSON.stringify(metadata));
    metadata.extension = (metadata?.filename||'').split('.').pop();

    return metadata;
  }

  server() {
    return this.tusServer;
  }
}
