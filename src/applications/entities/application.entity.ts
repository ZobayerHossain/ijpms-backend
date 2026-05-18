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

  // Added CASCADE behavior to prevent orphan rows when a user account is deleted
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicantId' })
  applicant: User;

  // Added CASCADE behavior to prevent orphan rows when a position post is deleted
  @ManyToOne(() => Position, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'positionId' })
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

  // New field to link the candidate's uploaded resume/CV document
  @Column({ type: 'varchar', nullable: true })
  resumeUrl: string;

  // New field to track the candidate's development portfolio or GitHub repository link
  @Column({ type: 'varchar', nullable: true })
  githubUrl: string;

  // New field to contain screening context or a direct message to recruiters
  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @CreateDateColumn()
  appliedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}