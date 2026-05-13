import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        department: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            fullName: string;
            email: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    getMe(user: User): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        department: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
