import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResourceService } from 'domain/services/resource/resource.service';

@Controller('resources')
export class ResourceController {
  private readonly logger = new Logger(ResourceController.name);

  constructor(private readonly resource: ResourceService) {}

  @All('*')
  public createLocation(@Req() req: Request, @Res() res: Response) {
    this.logger.log(`Received ${req.method} for uploading resources`);
    return this.resource.saveWithTus(req, res);
  }
}
