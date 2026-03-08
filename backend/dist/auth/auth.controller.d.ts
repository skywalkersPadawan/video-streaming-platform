import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import { LoginDto } from './dto/login.dto';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        userId: string;
        email: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: AuthenticatedRequest): {
        userId: string;
        email: string;
    };
}
export {};
