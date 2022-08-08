import { PartialType } from '@nestjs/swagger';
import { KonsumanDto } from './create-konsuman.dto';

export class UpdateKonsumanDto extends PartialType(KonsumanDto) {}
