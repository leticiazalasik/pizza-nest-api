import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
    constructor(private prisma: PrismaService) {}

  // Cria uma nova pizza
  async create(createPizzaDto: CreatePizzaDto) {
    const { categoryId, ...pizzaData } = createPizzaDto;  // Desestruturando o categoryId

    return this.prisma.pizza.create({
      data: {
        ...pizzaData,  // Dados da pizza
        category: {    // Relacionando com a categoria
          connect: { id: categoryId }, // Conectando à categoria pelo ID
        },
      },
    });
  }

  // Lista todas as pizzas
  findAll() {
    return this.prisma.pizza.findMany();
  }

  // Busca uma pizza específica
  async findOne(id: number) {
    const pizza = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!pizza) {
      throw new NotFoundException(`Pizza com ID ${id} não encontrada`);
    }

    return pizza;
  }

  async findPizzasByPrice(price: number) {
    try {
      // Lógica para encontrar pizzas com o preço fornecido
      const pizzas = await this.prisma.pizza.findMany({
        where: {
          price: {
            lte: price, // Aqui o preço será comparado com o valor que você forneceu na URL
          },
        },
      });

      if (!pizzas || pizzas.length === 0) {
        throw new NotFoundException(`Nenhuma pizza encontrada com preço até ${price}`);
      }

      return pizzas;
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar pizzas: ${error.message}`);
    }
  }
  // Busca pizzas disponíveis/indisponíveis
  async findPizzasAvailable(isAvailable: boolean) {
    try {
      const pizzas = await this.prisma.pizza.findMany({
        where: {
            isAvailable: isAvailable,
          },
      });

      // Se não encontrar nenhuma pizza, lança exceção
      if (!pizzas || pizzas.length === 0) {
        throw new NotFoundException( `Nenhuma pizza ${isAvailable ? 'disponível' : 'indisponível'} encontrada.`);
      }

      return pizzas;
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar pizzas: ${error.message}`);
    }
  }

  // Busca pizzas pelo nome da categoria
async findPizzasCategory(name: string) {
    try {
      // Verifica se o nome contém mais de uma palavra (indica que é uma busca exata)
      const isExactSearch = name.split(' ').length > 1;
  
      const pizzas = await this.prisma.pizza.findMany({
        where: {
          category: {
            name: isExactSearch
              ? { equals: name, mode: 'insensitive' }  // Pesquisa exata sem se importar com maiúsculas/minúsculas
              : { contains: name, mode: 'insensitive' }, // Pesquisa parcial ignorando maiúsculas/minúsculas
          },
        },
      });
  
      // Se não encontrar nenhuma pizza, lança exceção
      if (!pizzas || pizzas.length === 0) {
        throw new NotFoundException('Nenhuma pizza encontrada.');
      }
  
      return pizzas;
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar pizzas: ${error.message}`);
    }
  }
  



  // Atualiza uma pizza
  async update(id: number, updatePizzaDto: UpdatePizzaDto) {
    try {
      return await this.prisma.pizza.update({
        where: { id },
        data: updatePizzaDto,
      });
    } catch (error) {
      throw new NotFoundException(`Pizza com ID ${id} não encontrada`);
    }
  }

  // Remove uma pizza
  async remove(id: number) {
    try {
      return await this.prisma.pizza.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Pizza com ID ${id} não encontrada`);
    }
  }
}
