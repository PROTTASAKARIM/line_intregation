import { Controller, Post, Body, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';

@Controller('line-webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  // Channel Access Token for your LINE bot (replace with your actual token)
  private readonly CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';

  // Endpoint to handle incoming POST requests from LINE (webhook)
  @Post()
  async handleWebhook(@Body() body: any) {
    this.logger.log('Received webhook data:', body);

    // Extract the events array (LINE sends multiple events in a single webhook payload)
    const events = body.events;

    if (events && events.length > 0) {
      // Loop through the events (usually only one event)
      for (const event of events) {
        // Extract the Reply Token from the event data
        const replyToken = event.replyToken;

        // Optionally, log the Reply Token for debugging
        this.logger.log(`Extracted Reply Token: ${replyToken}`);

        // Get the user's message
        const userMessage = event.message.text;
        this.logger.log(`Received user message: ${userMessage}`);

        // Send a reply back to the user
        await this.sendReply(replyToken, `You said: ${userMessage}`);
      }
    }

    // Send a 200 OK response to LINE to acknowledge receipt of the event
    return { status: HttpStatus.OK, message: 'Event processed successfully' };
  }

  // Function to send a reply to the user
  private async sendReply(replyToken: string, message: string) {
    const payload = {
      replyToken: replyToken,  // The Reply Token extracted from the event
      messages: [
        {
          type: 'text',
          text: message,  // The reply message
        },
      ],
    };

    try {
      // Send the reply using the LINE Messaging API
      await axios.post('https://api.line.me/v2/bot/message/reply', payload, {
        headers: {
          Authorization: `Bearer ${this.CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      this.logger.log('Reply sent successfully!');
    } catch (error) {
      this.logger.error('Error sending reply:', error.response ? error.response.data : error);
    }
  }
}
