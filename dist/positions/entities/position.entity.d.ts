import { User } from '../../users/entities/user.entity';
export declare class Position {
    id: string;
    title: string;
    company: string;
    description: string;
    deadline: Date;
    slots: number;
    recruiter: User;
    createdAt: Date;
    updatedAt: Date;
}
