import { PartialType } from '@nestjs/mapped-types';
import { CreateLineImplementationDto } from './create-line_implementation.dto';

export class UpdateLineImplementationDto extends PartialType(
  CreateLineImplementationDto,
) {}
