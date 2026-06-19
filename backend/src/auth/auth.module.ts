import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // Registra o Passport como validador padrão
    PassportModule,
    // Configura o gerador de Tokens JWT
    JwtModule.register({
      // Em produção, isso DEVE vir do .env (ex: process.env.JWT_SECRET)
      secret: 'super-senha-secreta-ts-projetos',
      signOptions: {
        expiresIn: '8h', // O token do usuário será válido por 8 horas (um turno de trabalho)
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
