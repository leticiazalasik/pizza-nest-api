import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Salgada', description: 'Nome da categoria' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ 
    example: 'Pizzas salgadas tradicionais', 
    description: 'Descrição da categoria',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;
}