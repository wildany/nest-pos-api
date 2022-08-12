import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import {
  CreateKonsumanDto,
  FindKonsumenDto,
  KonsumanIdDto,
  ResponseKonsumenDto,
} from './dto/create-konsuman.dto';
import { UpdateKonsumanDto } from './dto/update-konsuman.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('Konsumen')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('konsumen')
export class KonsumenController {
  constructor(private readonly konsumenService: KonsumenService) {}

  @Post()
  @ApiBody({ type: CreateKonsumanDto })
  create(@InjectUser() createKonsumanDto: CreateKonsumanDto) {
    return this.konsumenService.create(createKonsumanDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseKonsumenDto })
  findAll(@Query() filter: FindKonsumenDto) {
    return this.konsumenService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.konsumenService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateKonsumanDto })
  update(
    @Param('id') id: string,
    @InjectUser() updateKonsumanDto: UpdateKonsumanDto,
  ) {
    return this.konsumenService.update(+id, updateKonsumanDto);
  }

  @Delete(':id')
  remove(@Param() konsuman: KonsumanIdDto) {
    return this.konsumenService.remove(konsuman.id);
  }
}
