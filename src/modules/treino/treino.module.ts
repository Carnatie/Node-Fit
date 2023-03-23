import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TreinoService } from './treino.service';
import { TreinoController } from './treino.controller';

@Module({
  controllers: [TreinoController],
  providers: [TreinoService, PrismaService],
  exports: [TreinoService],
})
export class TreinoModule {}
