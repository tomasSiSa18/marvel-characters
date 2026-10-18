import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity.js';
import { CharactersService } from './characters.service.js';
import { CharactersController } from './characters.controller.js';
import { Team } from '../teams/entities/team.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Team])],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
