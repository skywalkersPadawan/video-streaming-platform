import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    getUsers(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }[]>;
}
