import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

// O decorator @Controller('auth') define que todas as rotas aqui começarão com /auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota: POST http://localhost:3000/auth/login
  // Responsável por receber as credenciais e devolver o token JWT
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.senha);
  }

  // Rota Temporária: POST http://localhost:3000/auth/setup
  // Usaremos esta rota apenas uma vez para criar o seu utilizador de teste (Admin)
  @Post('setup')
  async setupAdmin(@Body() body: any) {
    return this.authService.registrarPrimeiroAdmin(
      body.email, 
      body.senha, 
      body.nome
    );
  }

  // Nova Rota Protegida: GET http://localhost:3000/auth/perfil
  // O @UseGuards(JwtAuthGuard) tranca a porta. Se não enviar o Token válido no cabeçalho, 
  // o NestJS retorna Erro 401 (Não Autorizado) automaticamente.
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getPerfil(@Req() req: any) {
    // Se o token for válido, a nossa JwtStrategy anexa os dados do utilizador no "req.user"
    return {
      mensagem: 'Acesso liberado à área restrita do sistema',
      usuario: req.user,
    };
  }
}
