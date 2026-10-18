import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { TeamsController } from './teams.controller.js';
import { CharactersModule } from '../characters/characters.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity.js';

@Module({
  imports: [CharactersModule, TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
