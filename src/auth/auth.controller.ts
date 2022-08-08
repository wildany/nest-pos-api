import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  cekUser(@Request() req) {
    return req.user;
  }

  @Post()
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.cekUser(
      authDto.username,
      authDto.password,
    );
    return this.authService.generateToken({ id: user.id });
  }
}
