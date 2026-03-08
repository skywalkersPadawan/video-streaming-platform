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
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    }>;
    getVideos(page?: number, limit?: number): Promise<{
        streamUrl: string;
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    }[]>;
    getVideoById(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    } | null>;
}
