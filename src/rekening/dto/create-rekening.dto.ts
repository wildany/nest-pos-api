import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { IsExist } from 'src/etc/validator/exist-validator';
import { User } from 'src/user/entities/user.entity';
import { Rekening } from '../entities/rekening.entity';

export class RekeningDto {
  @ApiProperty()
  @IsExist([Rekening, 'id'])
  id: number;

  @ApiProperty()
  @IsString()
  nama_rekening: string;

  @ApiProperty()
  @IsString()
  keterangan: string;

  @ApiProperty()
  @IsString()
  type_rekening: string;

  @IsObject()
  user: User;
}
export class CreateRekeningDto extends OmitType(RekeningDto, ['id']) {}
export class RekeningIdDto extends PickType(RekeningDto, ['id']) {}
