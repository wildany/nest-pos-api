import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';
import { UniqueValidator } from './etc/validator/unique-validator';
import { AuthModule } from './auth/auth.module';
import { ProdukModule } from './produk/produk.module';
import { Produk } from './produk/entities/produk.entity';
import { KonsumenModule } from './konsumen/konsumen.module';
import { RekeningModule } from './rekening/rekening.module';
import { Konsuman } from './konsumen/entities/konsuman.entity';
import { Rekening } from './rekening/entities/rekening.entity';
import { PenjualanModule } from './penjualan/penjualan.module';
import { Penjualan } from './penjualan/entities/penjualan.entity';
import { PenjualanItem } from './penjualan/entities/penjualan-item.entity';
import { PenjualanBayar } from './penjualan/entities/penjualan-bayar.entity';
import { PageService } from './etc/service/page/page.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [
        User,
        Produk,
        Konsuman,
        Rekening,
        Penjualan,
        PenjualanItem,
        PenjualanBayar,
      ],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UserModule,
    AuthModule,
    ProdukModule,
    KonsumenModule,
    RekeningModule,
    PenjualanModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator, UniqueValidator, PageService],
})
export class AppModule {}
