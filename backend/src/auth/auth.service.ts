import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Injetamos o Prisma (Banco de Dados) e o JwtService (Gerador de Crachás)
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Função principal de login
  async login(email: string, senhaDigitada: string) {
    // 1. Busca o usuário no banco de dados pelo email
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    // 2. Se o usuário não existir ou se cadastrou via Google (não tem senha), negamos o acesso
    if (!usuario || !usuario.senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 3. Compara a senha digitada em texto puro com a senha embaralhada (hash) salva no banco
    const senhaValida = await bcrypt.compare(senhaDigitada, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 4. Se a senha estiver correta, montamos o "payload" (os dados públicos do crachá)
    const payload = {
      sub: usuario.id, // O 'sub' (subject) é o padrão JWT para a ID do usuário
      email: usuario.email,
      role: usuario.role, // Aqui enviamos se ele é ADMIN, TECNICO ou USUARIO
    };

    // 5. Retornamos o Token gerado e assinado digitalmente
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        role: usuario.role,
      },
    };
  }

  // Função utilitária rápida para gerarmos a senha do nosso primeiro Admin futuramente
  async hashPassword(senha: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(senha, saltRounds);
  }
  
  // Função para registrar o primeiro admin
  async registrarPrimeiroAdmin(email: string, senhaDigitada: string, nome: string) {
    // Verifica se já existe alguém com esse email
    const usuarioExiste = await this.prisma.usuario.findUnique({ where: { email } });
    if (usuarioExiste) {
      throw new UnauthorizedException('Usuário já existe');
    }

    // Criptografa a senha antes de salvar no banco
    const senhaCriptografada = await this.hashPassword(senhaDigitada);

    // Cria o usuário no banco de dados forçando o nível ADMIN
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        role: 'ADMIN',
      },
    });

    // Retorna os dados do usuário sem a senha para segurança
    const { senha, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

}

