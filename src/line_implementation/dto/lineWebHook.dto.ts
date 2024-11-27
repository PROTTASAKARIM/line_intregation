import { IsArray } from 'class-validator';

export class LineWebhookDto {
  @IsArray()
  events: any[];
}
