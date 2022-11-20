import { MigrationInterface, QueryRunner } from 'typeorm';

export class resourceEntity1660171836502 implements MigrationInterface {
    name = 'resourceEntity1660171836502'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "resources" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "path" varchar NOT NULL, "mimeType" varchar NOT NULL, "updatedAt" datetime NOT NULL DEFAULT (datetime(\'now\')), "createdAt" datetime NOT NULL DEFAULT (datetime(\'now\')))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "resources"');
    }

}
