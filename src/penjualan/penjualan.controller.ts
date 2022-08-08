import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto, penjualanIdDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PenjualanProses } from './penjualan-proses.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('Penjualan')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Post()
  @ApiBody({ type: CreatePenjualanDto })
  create(@PenjualanProses() createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanService.create(createPenjualanDto);
  }

  @Get()
  findAll() {
    return this.penjualanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penjualanService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePenjualanDto })
  update(
    @Param('id') id: string,
    @PenjualanProses() updatePenjualanDto: UpdatePenjualanDto,
  ) {
    return this.penjualanService.update(+id, updatePenjualanDto);
  }

  @Delete(':id')
  remove(@Param() penjualan: penjualanIdDto) {
    return this.penjualanService.remove(penjualan.id);
  }
}
