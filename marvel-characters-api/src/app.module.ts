import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TeamsModule } from './teams/teams.module.js';
import { CharactersModule } from './characters/characters.module.js';

@Module({
  imports: [TeamsModule, CharactersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
