import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { User } from './users.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async auth(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (user && user.password === password) {
      //const { password, ...result } = user;
      //return result;
      //const tokenData = { result };
      const payload = { username: user.username, sub: user.id };
      const token = this.jwtService.sign(payload);
      const response = [
        {
          access_token: token,
        },
      ];
      return response;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
