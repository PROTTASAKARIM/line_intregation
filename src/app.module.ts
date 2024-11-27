import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineImplementationModule } from './line_implementation/line_implementation.module';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [LineImplementationModule],
  controllers: [AppController,WebhookController],
  providers: [AppService],
})
export class AppModule {}
