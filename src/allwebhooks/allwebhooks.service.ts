import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAllwebhookDto } from './dto/create-allwebhook.dto';
import { UpdateAllwebhookDto } from './dto/update-allwebhook.dto';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AllwebhooksService {
  private readonly CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';

  async pushMessage(userId: string, messages: { type: string; text: string }[]) {
    const retryKey = uuidv4(); // Generate a unique retry key (UUID)
    const payload = {
      to: userId,
      messages: messages,
    };

    try {
      const response = await axios.post(
        'https://api.line.me/v2/bot/message/push',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.CHANNEL_ACCESS_TOKEN}`,
            'X-Line-Retry-Key': retryKey,
          },
        },
      );

      return { status: 'success', data: response.data };
    } catch (error) {
      console.error('Error pushing message:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Error pushing message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
