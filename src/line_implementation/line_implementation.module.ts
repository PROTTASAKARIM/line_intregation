import { Module } from '@nestjs/common';
import { LineImplementationService } from './line_implementation.service';
import { LineImplementationController } from './line_implementation.controller';

@Module({
  controllers: [LineImplementationController],
  providers: [LineImplementationService],
})
export class LineImplementationModule {}
