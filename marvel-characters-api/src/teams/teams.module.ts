import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { TeamsController } from './teams.controller.js';
import { CharactersController } from '../characters/characters.controller.js';
import { CharactersModule } from '../characters/characters.module.js';

@Module({
  imports: [CharactersModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
