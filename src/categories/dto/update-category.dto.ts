import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

// PartialType faz com que todos os campos se tornem opcionais
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}