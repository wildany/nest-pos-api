import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { Produk } from './entities/produk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
