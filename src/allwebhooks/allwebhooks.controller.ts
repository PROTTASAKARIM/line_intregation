import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AllwebhooksService } from './allwebhooks.service';

@Controller('allwebhooks')
export class AllwebhooksController {
  constructor(private readonly allwebhooksService: AllwebhooksService) {}

  @Get('push-message')
  getHello(): string {
    return 'hi';
  }

  @Post('push-message')
  async pushMessage(@Body() body: any) {
    const { to: userId, messages } = body;
    console.log('userId, messages', userId, messages);
    return this.allwebhooksService.pushMessage(userId, messages);
  }

  @Get('followers')
  async getFollowers(
    @Query('limit') limit: number,
    @Query('start') start?: string,
  ) {
    return this.allwebhooksService.getFollowers(limit, start);
  }
  @Get('myInfo')
  async getMyInfo() {
    return this.allwebhooksService.getMyAccountInfo();
  }

  @Post('multicast')
  async sendMulticast(@Body() body: any) {
    const { to, messages } = body;
    return this.allwebhooksService.sendMulticast(to, messages);
  }
}
