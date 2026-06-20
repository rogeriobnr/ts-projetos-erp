import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Criamos uma classe que estende o AuthGuard padrão do Passport configurado para 'jwt'.
// Sempre que colocarmos @UseGuards(JwtAuthGuard) em cima de uma rota,
// ela exigirá o token válido.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
