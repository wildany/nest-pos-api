import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Repository } from 'typeorm';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { Penjualan } from './entities/penjualan.entity';

@Injectable()
export class PenjualanService extends PageService {
  constructor(
    @InjectRepository(Penjualan) private penjualanRepo: Repository<Penjualan>,
  ) {
    super();
  }
  create(createPenjualanDto: CreatePenjualanDto) {
    return this.penjualanRepo.save(createPenjualanDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.penjualanRepo, {
      relations: ['user', 'konsumen'],
    });
    // return this.penjualanRepo.find({ relations: ['user', 'konsumen'] });
  }

  findOne(id: number) {
    return this.penjualanRepo.findOne({
      relations: [
        'user',
        'konsumen',
        'item',
        'item.produk',
        'bayar',
        'bayar.rekening',
      ],
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePenjualanDto: UpdatePenjualanDto) {
    updatePenjualanDto.id = id;
    return this.penjualanRepo.save(updatePenjualanDto);
  }

  async remove(id: number) {
    const jual = await this.penjualanRepo.findOne({ where: { id: id } });
    return this.penjualanRepo.remove(jual);
  }
}
