import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchHistoryService {
  constructor(private prisma: PrismaService) {}

  async save(userId: string, movieId: number, progress: number) {
    return this.prisma.watchHistory.upsert({
      where: {
        userId_movieId: { userId, movieId },
      },
      update: { progress },
      create: { userId, movieId, progress },
    });
  }

  async get(userId: string, movieId: number) {
    return this.prisma.watchHistory.findUnique({
      where: {
        userId_movieId: { userId, movieId },
      },
    });
  }

  async getAll(userId: string) {
    return this.prisma.watchHistory.findMany({
      where: { userId, progress: { gt: 0 } },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
