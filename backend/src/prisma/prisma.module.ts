// backend/src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// O decorator @Global() torna este módulo disponível em toda a aplicação
@Global()
@Module({
  // Providers são os serviços que este módulo gerencia
  providers: [PrismaService],
  // Exports permite que os outros módulos usem o PrismaService
  exports: [PrismaService],
})
export class PrismaModule {}
