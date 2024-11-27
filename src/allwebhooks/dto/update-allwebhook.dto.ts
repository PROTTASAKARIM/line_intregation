import { PartialType } from '@nestjs/mapped-types';
import { CreateAllwebhookDto } from './create-allwebhook.dto';

export class UpdateAllwebhookDto extends PartialType(CreateAllwebhookDto) {}
