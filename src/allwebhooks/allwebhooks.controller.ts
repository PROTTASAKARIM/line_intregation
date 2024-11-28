import { Controller, Post, Body } from '@nestjs/common';
import { AllwebhooksService } from './allwebhooks.service';

@Controller('allwebhooks')
export class AllwebhooksController {
  constructor(private readonly allwebhooksService: AllwebhooksService) {}

  @Post('push-message')
  async pushMessage(@Body() body: any) {
    const { to:userId, messages } = body;
    console.log("userId, messages", userId, messages);
    return this.allwebhooksService.pushMessage(userId, messages);
  }

  // New route for replying to a message
  @Post('reply-message')
  async replyMessage(@Body() body: any) {
    const { replyToken, messages } = body;
    console.log("replyToken, messages", replyToken, messages);
    return this.allwebhooksService.replyMessage(replyToken, messages);
  }
}
