import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Position } from '../../positions/entities/position.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  SELECTED = 'selected',
  REJECTED = 'rejected',
  WAITLISTED = 'waitlisted',
}

export enum TriageLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  applicant: User;

  @ManyToOne(() => Position, { eager: true })
  @JoinColumn()
  position: Position;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @Column({
    type: 'enum',
    enum: TriageLevel,
    default: TriageLevel.MEDIUM,
  })
  triageLevel: TriageLevel;

  @Column({ nullable: true })
  interviewScore: number;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @CreateDateColumn()
  appliedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}