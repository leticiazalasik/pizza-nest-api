import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [PrismaModule, CategoriesModule, PizzasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
