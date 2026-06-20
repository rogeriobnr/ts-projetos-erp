// backend/src/auth/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrai o token do cabeçalho da requisição no formato "Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Garante que o token não expirou
      ignoreExpiration: false,
      // A mesma chave secreta que definimos no auth.module.ts
      secretOrKey: 'super-senha-secreta-ts-projetos',
    });
  }

  // Esta função é chamada automaticamente pelo Passport se o token for válido.
  // O que retornamos aqui é anexado à requisição (req.user),
  // disponibilizando os dados do usuário para qualquer rota protegida.
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
