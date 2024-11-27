import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllwebhooksService } from './allwebhooks.service';

@Controller('allwebhooks')
export class AllwebhooksController {
  constructor(private readonly allwebhooksService: AllwebhooksService) {}

  @Post('push-message')
  async pushMessage(@Body() body: any) {
    const { userId, messages } = body;
     // Expecting userId and messages in the request body
     console.log("userId, messages",userId, messages)
    return this.allwebhooksService.pushMessage(userId, messages);
  }

}
