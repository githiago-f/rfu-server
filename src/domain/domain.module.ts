import { Module } from '@nestjs/common';
import { InfraModule } from '@infra/infra.module';
import { ResourceService } from './services/resource/resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    InfraModule,
  ],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class DomainModule {}
