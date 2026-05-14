import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto, recruiter: User) {
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

  async findOne(id: string) {
    const position = await this.positionRepository.findOne({
      where: { id },
      relations: ['recruiter'],
    });
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto, user: User) {
    const position = await this.findOne(id);
    if (
      user.role !== UserRole.ADMIN &&
      position.recruiter.id !== user.id
    ) {
      throw new ForbiddenException('You can only update your own positions');
    }
    Object.assign(position, updatePositionDto);
    return await this.positionRepository.save(position);
  }

  async remove(id: string, user: User) {
    const position = await this.findOne(id);
    if (
      user.role !== UserRole.ADMIN &&
      position.recruiter.id !== user.id
    ) {
      throw new ForbiddenException('You can only delete your own positions');
    }
    await this.positionRepository.remove(position);
    return { message: 'Position deleted successfully' };
  }
}