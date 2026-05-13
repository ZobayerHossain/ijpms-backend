import { User } from '../../users/entities/user.entity';
import { Position } from '../../positions/entities/position.entity';
export declare enum ApplicationStatus {
    PENDING = "pending",
    SELECTED = "selected",
    REJECTED = "rejected",
    WAITLISTED = "waitlisted"
}
export declare enum TriageLevel {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}
export declare class Application {
    id: string;
    applicant: User;
    position: Position;
    status: ApplicationStatus;
    triageLevel: TriageLevel;
    interviewScore: number;
    notes: string;
    appliedAt: Date;
    updatedAt: Date;
}
