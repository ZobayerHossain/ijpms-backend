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
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { User } from '../users/entities/user.entity';

@Controller('positions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  create(
    @Body() createPositionDto: CreatePositionDto,
    @GetUser() user: User,
  ) {
    return this.positionsService.create(createPositionDto, user);
  }

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
    @GetUser() user: User,
  ) {
    return this.positionsService.update(id, updatePositionDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.RECRUITER, UserRole.ADMIN)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.positionsService.remove(id, user);
  }
}