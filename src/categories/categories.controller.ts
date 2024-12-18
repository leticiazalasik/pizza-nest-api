import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete,
    ParseIntPipe 
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  
  @ApiTags('categories') // Agrupa as rotas no Swagger
  @Controller('categories') // Define o prefixo da rota como /categories
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Post()
    @ApiOperation({ summary: 'Cria uma nova categoria' })
    @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoriesService.create(createCategoryDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lista todas as categorias' })
    findAll() {
      return this.categoriesService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Busca uma categoria pelo ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.categoriesService.findOne(id);
    }

    
  
    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza uma categoria' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
      return this.categoriesService.update(id, updateCategoryDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma categoria' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.categoriesService.remove(id);
    }
  }