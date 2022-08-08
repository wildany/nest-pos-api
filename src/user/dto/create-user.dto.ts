import { OmitType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from 'src/etc/validator/exist-validator';
import { IsUnique } from 'src/etc/validator/unique-validator';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(200)
  nama_user: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @IsUnique([User, 'email'])
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsUnique([User, 'username'])
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UserIdDto extends PickType(UserDto, ['id']) {}
