import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsUUID()
  positionId: string;

  // Allows submission of a resume address or storage string
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  // Allows submission of a GitHub/Portfolio URL
  @IsOptional()
  @IsString()
  githubUrl?: string;

  // Allows submission of optional introductory texts
  @IsOptional()
  @IsString()
  coverLetter?: string;
}