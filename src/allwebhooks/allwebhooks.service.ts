import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AllwebhooksService {
  // private readonly CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  
  // Method for pushing messages (existing)
  async pushMessage(userId: string, messages: { type: string; text: string }[]) {
    const retryKey = uuidv4(); // Generate a unique retry key (UUID)
    const payload = {
      to: userId,
      messages: messages,
    };
    console.log("payload",payload)
    try {
      console.log(process.env.LINE_CHANNEL_ACCESS_TOKEN)
      const response = await axios.post(
        'https://api.line.me/v2/bot/message/push',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'X-Line-Retry-Key': retryKey,
          },
        },
      );

      return { status: 'success', data: response.data };
    } catch (error) {
      console.log(error.response)
      console.error('Error pushing message:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Error pushing message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // New method for replying to a user
  async replyMessage(replyToken: string, messages: { type: string; text: string }[]) {
    const payload = {
      replyToken,
      messages,
    };

    try {
      const response = await axios.post(
        'https://api.line.me/v2/bot/message/reply',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          },
        },
      );

      return { status: 'success', data: response.data };
    } catch (error) {
      console.log(error.response);
      console.error('Error replying message:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Error replying message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
