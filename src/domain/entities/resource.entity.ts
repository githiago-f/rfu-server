import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ name: 'title' })
  public readonly title: string;

  @Column({ name: 'path' })
  public readonly path: string;

  @Column({ name: 'mimeType' })
  public readonly mimeType: string;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;
  @CreateDateColumn()
  public readonly createdAt: Date;
}
