import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterStatus } from '../enums/character-status.enum.js';

export class FilterCharactersDto {
  @IsOptional()
  @IsEnum(CharacterStatus)
  status?: CharacterStatus;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  teamId?: number;
}