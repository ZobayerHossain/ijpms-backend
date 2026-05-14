import { ApplicationStatus } from '../entities/application.entity';
export declare class UpdateResultDto {
    status: ApplicationStatus;
    interviewScore: number;
    notes: string;
}
