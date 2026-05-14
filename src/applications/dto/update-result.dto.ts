import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApplicationStatus } from '../entities/application.entity';

export class UpdateResultDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  interviewScore: number;

  @IsOptional()
  @IsString()
  notes: string;
}