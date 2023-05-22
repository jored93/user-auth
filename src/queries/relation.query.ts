import { IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class RelationQuery {
  @IsString()
  @IsOptional()
  @JSONSchema({ example: 'relation1,relation2' })
    relations?: string;
}
