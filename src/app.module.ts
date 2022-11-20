import { Module } from '@nestjs/common';
import { HttpModule } from './@app/http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resourceDSOptions } from '@infra/database/resource-datasource';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() { return resourceDSOptions; },
      async dataSourceFactory(options) {
        const ds = await new DataSource({
          ...options,
          entities: [],
          migrations: [],
        }).initialize();
        return ds;
      },
    }),
    HttpModule,
  ],
})
export class AppModule {}
