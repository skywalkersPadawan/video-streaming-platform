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

  async getVideos(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const videos = await this.prisma.video.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return videos;
  }

  async getVideoById(id: string) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }
}
