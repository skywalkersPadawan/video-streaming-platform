import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { MyListService } from './my-list.service';

@Controller('my-list')
export class MyListController {
  constructor(private service: MyListService) {}

  @Post('add')
  add(@Body() body: { userId: string; movieId: number }) {
    console.log('BODY:', body); // 👈 debug
    return this.service.add(body.userId, body.movieId);
  }

  @Delete('remove')
  remove(@Body() body: { userId: string; movieId: number }) {
    return this.service.remove(body.userId, body.movieId);
  }

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.service.get(userId);
  }

  @Get('test')
  test() {
    return this.service.get('test-user');
  }
}
