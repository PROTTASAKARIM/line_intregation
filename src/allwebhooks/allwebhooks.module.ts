import { Module } from '@nestjs/common';
import { AllwebhooksService } from './allwebhooks.service';
import { AllwebhooksController } from './allwebhooks.controller';

@Module({
  controllers: [AllwebhooksController],
  providers: [AllwebhooksService],
})
export class AllwebhooksModule {}
