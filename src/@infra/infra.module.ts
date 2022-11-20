import { Module } from '@nestjs/common';
import { Tus } from './storage/providers/tus';

@Module({
  providers:[Tus],
  exports: [Tus],
})
export class InfraModule {}
