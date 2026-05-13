import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
