import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus, TriageLevel } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { Position } from '../positions/entities/position.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  private calculateTriageLevel(score: number): TriageLevel {
    if (score >= 80) return TriageLevel.HIGH;
    if (score >= 50) return TriageLevel.MEDIUM;
    return TriageLevel.LOW;
  }

  async apply(createApplicationDto: CreateApplicationDto, applicant: User) {
    const position = await this.positionRepository.findOne({
      where: { id: createApplicationDto.positionId },
    });
    if (!position) {
      throw new NotFoundException('Position not found');
    }

    const existing = await this.applicationRepository.findOne({
      where: {
        applicant: { id: applicant.id },
        position: { id: position.id },
      },
    });
    if (existing) {
      throw new ConflictException('You have already applied for this position');
    }

    const application = this.applicationRepository.create({
      applicant,
      position,
    });
    return await this.applicationRepository.save(application);
  }

  async getMyApplications(applicant: User) {
    return await this.applicationRepository.find({
      where: { applicant: { id: applicant.id } },
      relations: ['position'],
    });
  }

  async updateResult(id: string, updateResultDto: UpdateResultDto, recruiter: User) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['position', 'position.recruiter'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (
      recruiter.role !== UserRole.ADMIN &&
      application.position.recruiter.id !== recruiter.id
    ) {
      throw new ForbiddenException('You can only update results for your own positions');
    }

    application.status = updateResultDto.status;
    if (updateResultDto.interviewScore !== undefined) {
      application.interviewScore = updateResultDto.interviewScore;
      application.triageLevel = this.calculateTriageLevel(updateResultDto.interviewScore);
    }
    if (updateResultDto.notes) {
      application.notes = updateResultDto.notes;
    }

    return await this.applicationRepository.save(application);
  }

  async getReport(applicantId: string) {
    const applications = await this.applicationRepository.find({
      where: { applicant: { id: applicantId } },
      relations: ['position'],
    });

    if (!applications.length) {
      throw new NotFoundException('No applications found for this applicant');
    }

    const scores = applications
      .filter((a) => a.interviewScore !== null)
      .map((a) => a.interviewScore);

    const averageScore =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;

    return {
      applicantId,
      totalApplications: applications.length,
      applications,
      averageScore: Math.round(averageScore * 100) / 100,
    };
  }

  async withdraw(id: string, applicant: User) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['applicant'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (
      applicant.role !== UserRole.ADMIN &&
      application.applicant.id !== applicant.id
    ) {
      throw new ForbiddenException('You can only withdraw your own applications');
    }
    await this.applicationRepository.remove(application);
    return { message: 'Application withdrawn successfully' };
  }

  async getTriageApplications() {
    const applications = await this.applicationRepository.find({
      relations: ['position', 'applicant'],
      order: { interviewScore: 'DESC' },
    });

    return {
      high: applications.filter((a) => a.triageLevel === TriageLevel.HIGH),
      medium: applications.filter((a) => a.triageLevel === TriageLevel.MEDIUM),
      low: applications.filter((a) => a.triageLevel === TriageLevel.LOW),
    };
  }
}