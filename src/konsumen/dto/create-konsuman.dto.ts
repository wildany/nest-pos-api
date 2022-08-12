import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { PageRequestDto, PageResponseDto } from 'src/etc/dto/page-dto';
import { IsExist } from 'src/etc/validator/exist-validator';
import { ProdukDto } from 'src/produk/dto/create-produk.dto';
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

export class FindKonsumenDto extends PageRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nama_konsumen: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  alamat_konsumen: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  no_hp_konsumen: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email_konsumen: string;
}

export class ResponseKonsumenDto extends PageResponseDto {
  @ApiProperty({ type: [KonsumanDto] })
  data: KonsumanDto[];
}
