import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User, UserRole } from '../users/entities/user.entity';

@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @Roles(UserRole.APPLICANT)
  apply(
    @Body() createApplicationDto: CreateApplicationDto,
    @GetUser() user: User,
  ) {
    return this.applicationsService.apply(createApplicationDto, user);
  }

  @Get('mine')
  @Roles(UserRole.APPLICANT)
  getMyApplications(@GetUser() user: User) {
    return this.applicationsService.getMyApplications(user);
  }

  @Get('triage')
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  getTriageApplications() {
    return this.applicationsService.getTriageApplications();
  }

  @Get('report/:applicantId')
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  getReport(@Param('applicantId') applicantId: string) {
    return this.applicationsService.getReport(applicantId);
  }

  @Patch(':id/result')
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  updateResult(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
    @GetUser() user: User,
  ) {
    return this.applicationsService.updateResult(id, updateResultDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.APPLICANT, UserRole.ADMIN)
  withdraw(@Param('id') id: string, @GetUser() user: User) {
    return this.applicationsService.withdraw(id, user);
  }
}