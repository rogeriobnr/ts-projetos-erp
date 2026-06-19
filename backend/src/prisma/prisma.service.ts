// backend/src/prisma/prisma.service.ts

import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// O decorator @Injectable() diz ao NestJS que esta classe pode ser injetada em outras partes do sistema
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    super({
      adapter: new PrismaPg({ connectionString: databaseUrl }),
    });
  }

  // onModuleInit é um método do ciclo de vida do NestJS.
  // Ele executa automaticamente quando o módulo é iniciado.
  async onModuleInit() {
    // Estabelece a conexão real com o PostgreSQL via Prisma
    await this.$connect();
  }
}
