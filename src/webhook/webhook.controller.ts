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

        if (event.type === 'message') {
          replyToken = event.replyToken;

        // Optionally, log the Reply Token for debugging
        this.logger.log(`Extracted Reply Token: ${replyToken}`);

        // Get the user's message
        const userMessage = event.message.text;
        this.logger.log(`Received user message: ${userMessage}`);
        await this.sendReply(event.replyToken, `your msg is received`);
        }
        if (event.type === 'follow') {
          const userId = event.source.userId;
  
          // Save userId to your database
          await this.saveUserToDatabase(userId);
          await this.sendReply(event.replyToken, `hello friend!`);
        }
        if (event.type === 'unfollow') {
          const userId = event.source.userId;
  
           // Save userId to your database
           await this.deleteUserToDatabase(userId);
          
        }
        if (event.type === 'join') {
          const groupId = event.source.groupId;
          await this.saveGroupToDatabase(groupId);
        }
        if (event.type === 'leave') {
          const groupId = event.source.groupId;
          await this.leaveGroupToDatabase(groupId);
        }
        if (event.type === 'postback') {
          // Retrieve the data sent by the postback button
          const postbackData = event.postback.data;
          
          // Parse the data if necessary (in this case it's in query string format)
          const params = new URLSearchParams(postbackData);
          const action = params.get('action');  // action=buy
          const itemId = params.get('itemid');  // itemid=123 or itemid=456
    
          console.log(`Postback action: ${action}, Item ID: ${itemId}`);
    
          // Handle the postback data - for example, send a reply back to the user
          if (action === 'buy') {
            await  this.sendReply(event.replyToken, `You chose to buy item with ID: ${itemId}`);
          }
        }
        if (event.type === 'beacon') {
          // Get the beacon type: 'enter' or 'leave'
          const beaconType = event.beacon.type;
          const beaconId = event.beacon.hwid; // The ID of the beacon
          const deviceId = event.source.userId; // User's ID who interacted with the beacon
    
          console.log(`Beacon event: ${beaconType}, Beacon ID: ${beaconId}, Device ID: ${deviceId}`);
    
          // Handle the beacon event - you can perform actions based on the beacon type
          if (beaconType === 'enter') {
           await this.sendReply(event.replyToken, `You are now near Beacon ID: ${beaconId}`);
          } else if (beaconType === 'leave') {
            await this.sendReply(event.replyToken, `You have left the range of Beacon ID: ${beaconId}`);
          }
        }
        if (event.type === 'accountLink') {
          const linkStatus = event.link.status; // "linked" or "unlinked"
          const userId = event.source.userId; // User ID
  
          console.log(`Account Link event: ${linkStatus} for User ID: ${userId}`);
  
          if (linkStatus === 'linked') {
            await this.sendReply(event.replyToken, `Your account has been successfully linked.`);
          } else if (linkStatus === 'unlinked') {
            await this.sendReply(event.replyToken, `Your account has been unlinked.`);
          }
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
  async deleteUserToDatabase(userId:string){
    /// database save code 
    console.log(`Saving userId: ${userId} to database`);
  }
  async saveGroupToDatabase(groupId:string){
    /// database save code 
    console.log(`Saving userId: ${groupId} to database`);
  }
  async leaveGroupToDatabase(groupId:string){
    /// database save code 
    console.log(`Saving userId: ${groupId} to database`);
  }
  async sendReply(replyToken:string, message:string) {
    const axios = require('axios');
    axios.post('https://api.line.me/v2/bot/message/reply', {
      replyToken: replyToken,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  }

  
}
