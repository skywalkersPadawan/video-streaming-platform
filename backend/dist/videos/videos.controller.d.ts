import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
export declare class VideosController {
    private videosService;
    constructor(videosService: VideosService);
    createVideo(body: CreateVideoDto): Promise<{
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
    getVideo(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        thumbnail: string;
        createdAt: Date;
    } | null>;
}
