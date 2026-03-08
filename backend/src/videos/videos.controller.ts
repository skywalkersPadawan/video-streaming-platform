import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Param } from '@nestjs/common';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createVideo(@Body() body: CreateVideoDto) {
    return this.videosService.createVideo(body);
  }

  @Get()
  getVideos() {
    return this.videosService.getVideos();
  }
  @Get(':id')
  getVideo(@Param('id') id: string) {
    return this.videosService.getVideoById(id);
  }
}
