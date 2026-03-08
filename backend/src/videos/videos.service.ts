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

  async getVideos() {
    return this.prisma.video.findMany();
  }
}
