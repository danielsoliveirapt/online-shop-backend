import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { User } from './users.interface';
import { UserDto } from './users.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-user', 'create-user', 'auth-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<User[]> {
    return this.client.send('find-all-user', {});
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<User> {
    return this.client.send('create-user', user);
  }

  @Post('auth')
  @ApiBody({ type: LoginDto })
  auth(@Body() user: LoginDto): Observable<User> {
    return this.client.send('auth-user', user);
  }
}
