import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';
import { IsExist } from 'src/etc/validator/exist-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Konsuman } from '../entities/konsuman.entity';

export class KonsumanDto {
  @ApiProperty()
  @IsExist([Konsuman, 'id'])
  id: number;

  @ApiProperty()
  @IsString()
  nama_konsumen: string;

  @ApiProperty()
  @IsString()
  alamat_konsumen: string;

  @ApiProperty()
  @IsString()
  no_hp_konsumen: string;

  @ApiProperty()
  @IsEmail()
  email_konsumen: string;

  @IsObject()
  user: CreateUserDto;
}

export class CreateKonsumanDto extends OmitType(KonsumanDto, ['id']) {}
export class KonsumanIdDto extends PickType(KonsumanDto, ['id']) {}
