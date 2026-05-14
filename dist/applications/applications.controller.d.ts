import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { User } from '../users/entities/user.entity';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(createApplicationDto: CreateApplicationDto, user: User): Promise<import("./entities/application.entity").Application>;
    getMyApplications(user: User): Promise<import("./entities/application.entity").Application[]>;
    getTriageApplications(): Promise<{
        high: import("./entities/application.entity").Application[];
        medium: import("./entities/application.entity").Application[];
        low: import("./entities/application.entity").Application[];
    }>;
    getReport(applicantId: string): Promise<{
        applicantId: string;
        totalApplications: number;
        applications: import("./entities/application.entity").Application[];
        averageScore: number;
    }>;
    updateResult(id: string, updateResultDto: UpdateResultDto, user: User): Promise<import("./entities/application.entity").Application>;
    withdraw(id: string, user: User): Promise<{
        message: string;
    }>;
}
