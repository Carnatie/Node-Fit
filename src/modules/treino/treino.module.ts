import { Module } from '@nestjs/common';
import { TreinoController } from './treino.controller';
import { TreinoService } from './treino.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TreinoController],
  providers: [TreinoService, PrismaService],
  exports: [TreinoService],
})
export class TreinoModule {}
