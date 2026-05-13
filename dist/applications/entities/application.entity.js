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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.TriageLevel = exports.ApplicationStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const position_entity_1 = require("../../positions/entities/position.entity");
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["PENDING"] = "pending";
    ApplicationStatus["SELECTED"] = "selected";
    ApplicationStatus["REJECTED"] = "rejected";
    ApplicationStatus["WAITLISTED"] = "waitlisted";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var TriageLevel;
(function (TriageLevel) {
    TriageLevel["HIGH"] = "high";
    TriageLevel["MEDIUM"] = "medium";
    TriageLevel["LOW"] = "low";
})(TriageLevel || (exports.TriageLevel = TriageLevel = {}));
let Application = class Application {
    id;
    applicant;
    position;
    status;
    triageLevel;
    interviewScore;
    notes;
    appliedAt;
    updatedAt;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Application.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", position_entity_1.Position)
], Application.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TriageLevel,
        default: TriageLevel.MEDIUM,
    }),
    __metadata("design:type", String)
], Application.prototype, "triageLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Application.prototype, "interviewScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Application.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "appliedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications')
], Application);
//# sourceMappingURL=application.entity.js.map