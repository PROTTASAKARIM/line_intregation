import { Injectable } from '@nestjs/common';
import { Client, WebhookEvent, MessageAPIResponseBase, TextMessage } from '@line/bot-sdk';
import axios from 'axios';


@Injectable()
export class LineImplementationService {

  private readonly LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  private readonly LINE_API_URL = 'https://api.line.me/v2/bot/message/push';
 
  
  async sendMessage(to: string, message: string) {
    console.log(to,message)
    try {
      const response = await axios.post(
        this.LINE_API_URL,
        {
          to,
          messages: [
            {
              type: 'text',
              text: message,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.LINE_CHANNEL_ACCESS_TOKEN}`,
          },
        }
      );
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error(error?.response)
      console.error('Error sending message:', error.response?.data || error.message);
    }
  }
 


}
