import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
export declare class VideosController {
    private videosService;
    constructor(videosService: VideosService);
    createVideo(body: CreateVideoDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        streamUrl: string;
    }>;
    getVideos(page?: number, limit?: number): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    }[]>;
    getVideo(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
    } | null>;
}
