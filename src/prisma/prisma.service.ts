import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Conecta ao banco quando o módulo iniciar
  async onModuleInit() {
    await this.$connect();
  }

  // Desconecta do banco quando o módulo for destruído
  async onModuleDestroy() {
    await this.$disconnect();
  }
}