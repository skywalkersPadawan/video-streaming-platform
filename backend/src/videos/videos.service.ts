import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async createVideo(data: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
  }) {
    return this.prisma.video.create({
      data,
    });
  }

  async getVideos(page = 1, limit = 10) {
    const videos = await this.prisma.video.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return videos.map((video) => ({
      ...video,
      streamUrl: '/streams/video-1772975721459-883177471/playlist.m3u8',
    }));
  }

  async getVideoById(id: string) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }
}
