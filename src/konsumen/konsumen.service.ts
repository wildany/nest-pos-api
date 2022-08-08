import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKonsumanDto } from './dto/create-konsuman.dto';
import { UpdateKonsumanDto } from './dto/update-konsuman.dto';
import { Konsuman } from './entities/konsuman.entity';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsuman) private konsumanRepo: Repository<Konsuman>,
  ) {}
  create(createKonsumanDto: CreateKonsumanDto) {
    return this.konsumanRepo.save(createKonsumanDto);
  }

  findAll() {
    return this.konsumanRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.konsumanRepo.findOne({ where: { id: id } });
  }

  update(id: number, updateKonsumanDto: UpdateKonsumanDto) {
    return this.konsumanRepo.save(updateKonsumanDto);
  }

  async remove(id: number) {
    const konsumen = await this.konsumanRepo.findOne({ where: { id: id } });
    return this.konsumanRepo.remove(konsumen);
  }
}
