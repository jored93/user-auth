import { OrderDirections } from '@constants/orderDirection';
import { IsBoolean, IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { OrderDirection } from '@enums/order-direction.enum';
import { JSONSchema } from 'class-validator-jsonschema';
export class OptionQuery {
  @IsEnum(OrderDirections)
  @IsOptional()
    sortDirection?: OrderDirection;

  @IsString()
  @IsOptional()
    sortField?: string;

  @IsString()
  @IsOptional()
    filterField?: string;

  @IsString()
  @IsOptional()
    filterValue?: string;

  @IsPositive()
  @IsOptional()
    limit!: number;

  @IsPositive()
  @IsOptional()
    offset!: number;

  @IsString()
  @IsOptional()
    boolField!: string;

  @IsBoolean()
  @IsOptional()
    boolValue!: boolean;

  @IsString()
  @IsOptional()
  @JSONSchema({ example: 'relation1,relation2' })
    relations?: string;
}
