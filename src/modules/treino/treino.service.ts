import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TreinoService {
  constructor(private prisma: PrismaService) {}

  async criarTreino() {
    
  }
}
