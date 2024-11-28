import { Controller, Post, Body, HttpStatus, Logger, Get } from '@nestjs/common';
import axios from 'axios';

// @Controller('line')
@Controller('line-webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  // Channel Access Token for your LINE bot (replace with your actual token)
  private readonly CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';

  // Endpoint to handle incoming POST requests from LINE (webhook)
  @Get()
  getHello(): string {
    return "hi";
  }
  @Post()
  async handleWebhook(@Body() body: any) {
    this.logger.log('Received webhook data:', body);
console.log('logger',this.logger)
    // Extract the events array (LINE sends multiple events in a single webhook payload)
    const events = body.events;
    console.log(events)

    let replyToken = null;

    if (events && events.length > 0) {
      // Loop through the events (usually only one event)
      for (const event of events) {
        // Extract the Reply Token from the event data
        replyToken = event.replyToken;

        // Optionally, log the Reply Token for debugging
        this.logger.log(`Extracted Reply Token: ${replyToken}`);

        // Get the user's message
        const userMessage = event.message.text;
        this.logger.log(`Received user message: ${userMessage}`);

        if (event.type === 'follow') {
          const userId = event.source.userId;
  
          // Save userId to your database
          this.saveUserToDatabase(userId);
        }

        // Send a reply back to the user
        // await this.sendReply(replyToken, `You said: ${userMessage}`);
      }
    }

    // Send a 200 OK response with the replyToken included
    return {
      status: HttpStatus.OK,
      message: 'Event processed successfully',
      replyToken: replyToken, // Include replyToken in the response body
      events:events
    };
  }

  async saveUserToDatabase(userId:string){
    /// database save code 
    console.log(`Saving userId: ${userId} to database`);
  }

  
}
