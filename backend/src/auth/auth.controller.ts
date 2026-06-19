import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

// O decorator @Controller('auth') define que todas as rotas aqui começarão com /auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota: POST http://localhost:3000/auth/login
  @Post('login')
  async login(@Body() body: any) {
    // Chama a regra de negócio do serviço passando os dados recebidos
    return this.authService.login(body.email, body.senha);
  }

  // Rota Temporária: POST http://localhost:3000/auth/setup
  // Usaremos esta rota apenas uma vez para criar o seu usuário de teste
  @Post('setup')
  async setupAdmin(@Body() body: any) {
    return this.authService.registrarPrimeiroAdmin(
      body.email,
      body.senha,
      body.nome,
    );
  }
}
