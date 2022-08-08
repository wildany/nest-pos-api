import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password);
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id: id } });
  }

  findUsername(username) {
    return this.userRepo.findOne({
      select: ['id', 'password'],
      where: { username: username },
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return this.userRepo.remove(user);
  }

  hash(plainPassword: string) {
    const hash = bcrypt.hashSync(plainPassword, 10);
    return hash;
  }

  compare(plainPassword, hash) {
    const isValid = bcrypt.compareSync(plainPassword, hash);
    return isValid;
  }
}
