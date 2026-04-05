import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { MyListModule } from './my-list/my-list.module';
import { WatchHistoryModule } from './watch-history/watch-history.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    VideosModule,
    MyListModule,
    WatchHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
