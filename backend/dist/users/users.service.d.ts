import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, password: string): Promise<{
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
