import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() permite que o PrismaService seja usado em toda a aplicação
@Global()

@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Permite que outros módulos usem o PrismaService
})
export class PrismaModule {}
