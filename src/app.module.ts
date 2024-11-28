import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineImplementationModule } from './line_implementation/line_implementation.module';
import { AllwebhooksModule } from './allwebhooks/allwebhooks.module';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [LineImplementationModule, AllwebhooksModule],
  controllers: [AppController, WebhookController],
  providers: [AppService],
})
export class AppModule {}
