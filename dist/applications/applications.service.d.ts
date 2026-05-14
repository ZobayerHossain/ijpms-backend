import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { User } from '../users/entities/user.entity';
import { Position } from '../positions/entities/position.entity';
export declare class ApplicationsService {
    private applicationRepository;
    private positionRepository;
    constructor(applicationRepository: Repository<Application>, positionRepository: Repository<Position>);
    private calculateTriageLevel;
    apply(createApplicationDto: CreateApplicationDto, applicant: User): Promise<Application>;
    getMyApplications(applicant: User): Promise<Application[]>;
    updateResult(id: string, updateResultDto: UpdateResultDto, recruiter: User): Promise<Application>;
    getReport(applicantId: string): Promise<{
        applicantId: string;
        totalApplications: number;
        applications: Application[];
        averageScore: number;
    }>;
    withdraw(id: string, applicant: User): Promise<{
        message: string;
    }>;
    getTriageApplications(): Promise<{
        high: Application[];
        medium: Application[];
        low: Application[];
    }>;
}
