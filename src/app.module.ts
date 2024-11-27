import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineImplementationModule } from './line_implementation/line_implementation.module';
import { AllwebhooksModule } from './allwebhooks/allwebhooks.module';

@Module({
  imports: [LineImplementationModule, AllwebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
