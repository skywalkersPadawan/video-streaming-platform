import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private service: WatchHistoryService) {}

  @Post('save')
  save(@Body() body: any) {
    return this.service.save(body.userId, body.movieId, body.progress);
  }

  @Get(':userId/:movieId')
  get(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.service.get(userId, Number(movieId));
  }
}
