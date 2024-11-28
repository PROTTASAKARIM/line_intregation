import { Body, Controller, Post } from '@nestjs/common';
import { LineImplementationService } from './line_implementation.service';
import axios from 'axios';

@Controller('line')
export class LineImplementationController {
  constructor(private readonly lineService: LineImplementationService) {}

  @Post('send-message')
  async sendMessage(@Body() body: { to: string; message: string }) {
    try {
      const { to, message } = body;
      const result = await this.lineService.sendMessage(to, message);
      return { result };
    } catch (err) {
      return err;
    }
  }
}
