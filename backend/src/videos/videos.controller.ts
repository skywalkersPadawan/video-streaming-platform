import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  createVideo(@Body() body: any) {
    return this.videosService.createVideo(body);
  }

  @Get()
  getVideos() {
    return this.videosService.getVideos();
  }
}
