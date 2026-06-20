// backend/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // <-- Importação nova

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'super-senha-secreta-ts-projetos',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // <-- Adicionado aqui
})
export class AuthModule {}
