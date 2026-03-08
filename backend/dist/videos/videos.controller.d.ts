import { VideosService } from './videos.service';
export declare class VideosController {
    private videosService;
    constructor(videosService: VideosService);
    createVideo(body: any): Promise<{
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
}
