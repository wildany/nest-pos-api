import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Selamat datang, silahkan mengunjungi dokumentasi di https://wildan-ecommerce.herokuapp.com/doc :)';
  }
}
