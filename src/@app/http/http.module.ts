import { Module } from '@nestjs/common';
import { DomainModule } from 'domain/domain.module';
import { ResourceController } from './resource/resource.controller';

@Module({
  imports: [DomainModule],
  controllers: [ResourceController],
})
export class HttpModule {}
