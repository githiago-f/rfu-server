import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Tus } from '@infra/storage/providers/tus';
import { EVENTS } from 'tus-node-server';
import { Repository } from 'typeorm';
import { Resource } from 'domain/entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourceService {
  private readonly logger = new Logger(ResourceService.name);
  constructor(
    private readonly tus: Tus,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {
    this.logger.debug(`Component created at ${new Date().toISOString()}`);
  }

  public saveWithTus(req: Request, res: Response) {
    this.tus.server().on(EVENTS.EVENT_UPLOAD_COMPLETE, (stream) => {
      this.logger.debug(`UPLOAD COMPLETE: ${JSON.stringify(stream)}`);
    });
    this.tus.server().on(EVENTS.EVENT_FILE_CREATED, (stream) => {
      this.logger.debug(`EVENT FILE CREATED: ${JSON.stringify(stream)}`);
    });
    return this.tus.server().handle(req, res);
  }
}
