import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, MinLength, Matches, Min, IsInt } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Margherita' })
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'O nome da pizza não pode conter caracteres especiais.' })  // Validação para nome sem caracteres especiais
  name: string;

  @ApiProperty({ example: 'Molho de tomate, mussarela, manjericão' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 45.90 })
  @IsNumber()
  @Min(0.01, { message: 'O preço precisa ser maior que 0.' })  // Validação para preço mínimo
  price: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ example: 1, description: 'ID da categoria à qual a pizza pertence' })
  @IsInt()
  categoryId: number; // Este é o relacionamento com a categoria

}