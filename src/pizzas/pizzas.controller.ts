import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete,
    ParseIntPipe, 
    ParseBoolPipe
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { PizzasService } from './pizzas.service';
  import { CreatePizzaDto } from './dto/create-pizza.dto';
  import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PrismaService } from 'src/prisma/prisma.service';
  
  @ApiTags('pizzas') // Agrupa as rotas no Swagger
  @Controller('pizzas') // Define o prefixo da rota como /pizzas
  export class PizzasController {
    constructor(private readonly pizzasService: PizzasService, private readonly prisma: PrismaService) {}
  
    @Post()
    @ApiOperation({ summary: 'Cria uma nova pizza' })
    @ApiResponse({ status: 201, description: 'Pizza criada com sucesso.' })
    create(@Body() createPizzaDto: CreatePizzaDto) {
      return this.pizzasService.create(createPizzaDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lista todas as pizzas' })
    findAll() {
      return this.pizzasService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Busca uma pizza pelo ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.pizzasService.findOne(id);
    }

    @Get('/categoria/:nome')
    @ApiOperation({ summary: 'Busca uma pizza pelo nome da categoria' })
    async findmany(@Param('nome') nome: string) {
      return this.pizzasService.findPizzasCategory(nome);
    }

    @Get('/precoBaixo/:price')
    @ApiOperation({ summary: 'Busca pizzas com valor até o preço fornecido' })
    async findLowprice(@Param('price', ParseIntPipe) price: number) {
      return this.pizzasService.findPizzasByPrice(price);  
    }

    //Busca as pizzas disponíveis
    @Get('/available/:isAvailable')  
  @ApiOperation({ summary: 'Busca pizzas disponíveis/indisponíveis' })
  async findDisponiveis(@Param('isAvailable', ParseBoolPipe) isAvailable: boolean) {
    return this.pizzasService.findPizzasAvailable(isAvailable);  // Passa o parâmetro para o serviço
  }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma pizza' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePizzaDto: UpdatePizzaDto,
    ) {
      return this.pizzasService.update(id, updatePizzaDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma  pizza' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.pizzasService.remove(id);
    }
  }

  