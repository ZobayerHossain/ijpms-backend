import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { User } from '../users/entities/user.entity';
export declare class PositionsService {
    private positionRepository;
    constructor(positionRepository: Repository<Position>);
    create(createPositionDto: CreatePositionDto, recruiter: User): Promise<Position>;
    findAll(): Promise<Position[]>;
    findOne(id: string): Promise<Position>;
    update(id: string, updatePositionDto: UpdatePositionDto, user: User): Promise<Position>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
}
