import { DataSource, DataSourceOptions } from 'typeorm';

export const resourceDSOptions = {
  type: 'sqlite',
  database: './storage/bd.sqlite',
  logging: true,
  entitySkipConstructor: true,
  entities: ['src/domain/entities/**.entity.ts'], 
  migrations: ['src/@infra/database/migrations/*.ts'],
} as DataSourceOptions;

const dataSource = new DataSource(resourceDSOptions);

export default dataSource;
