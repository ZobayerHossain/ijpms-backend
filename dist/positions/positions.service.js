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
exports.PositionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const position_entity_1 = require("./entities/position.entity");
const user_entity_1 = require("../users/entities/user.entity");
let PositionsService = class PositionsService {
    positionRepository;
    constructor(positionRepository) {
        this.positionRepository = positionRepository;
    }
    async create(createPositionDto, recruiter) {
        const position = this.positionRepository.create({
            ...createPositionDto,
            recruiter,
        });
        return await this.positionRepository.save(position);
    }
    async findAll() {
        return await this.positionRepository.find({
            relations: ['recruiter'],
        });
    }
    async findOne(id) {
        const position = await this.positionRepository.findOne({
            where: { id },
            relations: ['recruiter'],
        });
        if (!position) {
            throw new common_1.NotFoundException('Position not found');
        }
        return position;
    }
    async update(id, updatePositionDto, user) {
        const position = await this.findOne(id);
        if (user.role !== user_entity_1.UserRole.ADMIN &&
            position.recruiter.id !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own positions');
        }
        Object.assign(position, updatePositionDto);
        return await this.positionRepository.save(position);
    }
    async remove(id, user) {
        const position = await this.findOne(id);
        if (user.role !== user_entity_1.UserRole.ADMIN &&
            position.recruiter.id !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own positions');
        }
        await this.positionRepository.remove(position);
        return { message: 'Position deleted successfully' };
    }
};
exports.PositionsService = PositionsService;
exports.PositionsService = PositionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(position_entity_1.Position)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PositionsService);
//# sourceMappingURL=positions.service.js.map