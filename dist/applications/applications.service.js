"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./entities/application.entity");
const user_entity_1 = require("../users/entities/user.entity");
const position_entity_1 = require("../positions/entities/position.entity");
let ApplicationsService = class ApplicationsService {
    applicationRepository;
    positionRepository;
    constructor(applicationRepository, positionRepository) {
        this.applicationRepository = applicationRepository;
        this.positionRepository = positionRepository;
    }
    calculateTriageLevel(score) {
        if (score >= 80)
            return application_entity_1.TriageLevel.HIGH;
        if (score >= 50)
            return application_entity_1.TriageLevel.MEDIUM;
        return application_entity_1.TriageLevel.LOW;
    }
    async apply(createApplicationDto, applicant) {
        const position = await this.positionRepository.findOne({
            where: { id: createApplicationDto.positionId },
        });
        if (!position) {
            throw new common_1.NotFoundException('Position not found');
        }
        const existing = await this.applicationRepository.findOne({
            where: {
                applicant: { id: applicant.id },
                position: { id: position.id },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('You have already applied for this position');
        }
        const application = this.applicationRepository.create({
            applicant,
            position,
        });
        return await this.applicationRepository.save(application);
    }
    async getMyApplications(applicant) {
        return await this.applicationRepository.find({
            where: { applicant: { id: applicant.id } },
            relations: ['position'],
        });
    }
    async updateResult(id, updateResultDto, recruiter) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['position', 'position.recruiter'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (recruiter.role !== user_entity_1.UserRole.ADMIN &&
            application.position.recruiter.id !== recruiter.id) {
            throw new common_1.ForbiddenException('You can only update results for your own positions');
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
    async getReport(applicantId) {
        const applications = await this.applicationRepository.find({
            where: { applicant: { id: applicantId } },
            relations: ['position'],
        });
        if (!applications.length) {
            throw new common_1.NotFoundException('No applications found for this applicant');
        }
        const scores = applications
            .filter((a) => a.interviewScore !== null)
            .map((a) => a.interviewScore);
        const averageScore = scores.length > 0
            ? scores.reduce((a, b) => a + b, 0) / scores.length
            : 0;
        return {
            applicantId,
            totalApplications: applications.length,
            applications,
            averageScore: Math.round(averageScore * 100) / 100,
        };
    }
    async withdraw(id, applicant) {
        const application = await this.applicationRepository.findOne({
            where: { id },
            relations: ['applicant'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (applicant.role !== user_entity_1.UserRole.ADMIN &&
            application.applicant.id !== applicant.id) {
            throw new common_1.ForbiddenException('You can only withdraw your own applications');
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
            high: applications.filter((a) => a.triageLevel === application_entity_1.TriageLevel.HIGH),
            medium: applications.filter((a) => a.triageLevel === application_entity_1.TriageLevel.MEDIUM),
            low: applications.filter((a) => a.triageLevel === application_entity_1.TriageLevel.LOW),
        };
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map