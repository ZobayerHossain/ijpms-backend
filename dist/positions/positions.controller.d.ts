import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { User } from '../users/entities/user.entity';
export declare class PositionsController {
    private readonly positionsService;
    constructor(positionsService: PositionsService);
    create(createPositionDto: CreatePositionDto, user: User): Promise<import("./entities/position.entity").Position>;
    findAll(): Promise<import("./entities/position.entity").Position[]>;
    findOne(id: string): Promise<import("./entities/position.entity").Position>;
    update(id: string, updatePositionDto: UpdatePositionDto, user: User): Promise<import("./entities/position.entity").Position>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
}
