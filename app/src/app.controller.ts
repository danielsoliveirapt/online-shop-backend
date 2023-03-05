import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api') // ponto de partida da API (podemos modar o url da api)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // (Endepoint) isto faz com que a rota seja um getter e traz a rota de full
  getHello(): string {
    return this.appService.getHello();
  }
}
