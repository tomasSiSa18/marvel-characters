import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { CharactersService } from '../characters/characters.service.js';

@Injectable()
export class TeamsService {

  constructor(private readonly charactersService: CharactersService){}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {

    var t: string = ''
    
    const characters = this.charactersService.findAll()

    for (const c in characters) {

      t += characters[c] + ','

    }
    return `This action returns all teams` + t;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
