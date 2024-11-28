import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

@Injectable()
export class AllwebhooksService {
  // private readonly CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  // Method for pushing messages (existing)
  async pushMessage(
    userId: string,
    messages: { type: string; text: string }[],
  ) {
    const retryKey = uuidv4(); // Generate a unique retry key (UUID)
    const payload = {
      to: userId,
      messages: messages,
    };

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Line-Retry-Key': retryKey,
      },
    };

    console.log('Payload:', payload);
    console.log('retryKey', retryKey);
    console.log('headers', headers);

    try {
      // console.log(process.env.LINE_CHANNEL_ACCESS_TOKEN)
      const response = await axios.post(
        'https://api.line.me/v2/bot/message/push',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'X-Line-Retry-Key': retryKey,
          },
        },
      );

      return { status: 'success', data: response.data };
    } catch (error) {
      console.log(error.message);
      console.error(
        'Error pushing message:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Error pushing message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // New method for replying to a user
  async getFollowers(limit = 1000, start?: string): Promise<any> {
    try {
      // Construct the query parameters
      const params: any = { limit };
      if (start) {
        params.start = start;
      }

      // Make the GET request
      const response = await axios.get(
        `https://api.line.me/v2/bot/followers/ids`,
        {
          headers: {
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          },
          params, // Include the query params here
        },
      );

      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        throw new HttpException(
          {
            message: error.response.data.message || 'Failed to fetch followers',
            details: error.response.data,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getMyAccountInfo(): Promise<any> {
    try {
      // Construct the query parameters

      // Make the GET request
      const response = await axios.get(`https://api.line.me/v2/bot/info`, {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        // Include the query params here
      });

      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        throw new HttpException(
          {
            message:
              error.response.data.message || 'Failed to fetch my informations',
            details: error.response.data,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendMulticast(to: string[], messages: any[]): Promise<any> {
    try {
      // Generate a unique retry key
      const retryKey = uuidv4();

      // Prepare the payload
      const payload = {
        to,
        messages,
      };
      console.log('payload', payload);
      // Make the POST request
      const response = await axios.post(
        `https://api.line.me/v2/bot/message/multicast`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'X-Line-Retry-Key': retryKey,
          },
        },
      );
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        throw new HttpException(
          {
            message:
              error.response.data.message || 'Failed to send multicast message',
            details: error.response.data,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async sendBroadCastMsg( messages: any[]): Promise<any> {
    try {
      // Generate a unique retry key
      const retryKey = uuidv4();

      // Prepare the payload
      const payload = {
        messages,
      };
      console.log('payload', payload);
      // Make the POST request
      const response = await axios.post(
        `https://api.line.me/v2/bot/message/broadcast`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'X-Line-Retry-Key': retryKey,
          },
        },
      );
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response) {
        throw new HttpException(
          {
            message:
              error.response.data.message || 'Failed to send multicast message',
            details: error.response.data,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
