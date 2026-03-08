import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createVideo(@Body() body: CreateVideoDto) {
    return this.videosService.createVideo(body);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `video-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const inputPath = file.path;
    const videoId = file.filename.split('.')[0];

    const outputDir = join('streams', videoId);

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, 'playlist.m3u8');

    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-hls_segment_filename',
          `${outputDir}/segment_%03d.seg`,
          '-f hls',
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    return {
      streamUrl: `/streams/${videoId}/playlist.m3u8`,
    };
  }

  @Get()
  getVideos(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.videosService.getVideos(Number(page), Number(limit));
  }

  @Get(':id')
  getVideo(@Param('id') id: string) {
    return this.videosService.getVideoById(id);
  }
}
