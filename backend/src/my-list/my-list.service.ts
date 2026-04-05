import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MyListService {
  constructor(private prisma: PrismaService) {}

  async add(userId: string, movieId: number) {
    const existing = await this.prisma.myList.findFirst({
      where: { userId, movieId },
    });

    if (existing) {
      console.log('ALREADY EXISTS');
      return existing;
    }

    console.log('ADDING NEW');

    return this.prisma.myList.create({
      data: { userId, movieId },
    });
  }

  async remove(userId: string, movieId: number) {
    console.log('REMOVING', { userId, movieId });
    return this.prisma.myList.deleteMany({
      where: { userId, movieId },
    });
  }

  get(userId: string) {
    return this.prisma.myList.findMany({
      where: { userId },
    });
  }
}
