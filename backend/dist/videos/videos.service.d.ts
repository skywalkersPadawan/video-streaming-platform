import { PrismaService } from '../prisma/prisma.service';
export declare class VideosService {
    private prisma;
    constructor(prisma: PrismaService);
    createVideo(data: {
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    }): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
        createdAt: Date;
    }>;
    getVideos(): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
        createdAt: Date;
    }[]>;
    getVideoById(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
        createdAt: Date;
    } | null>;
}
