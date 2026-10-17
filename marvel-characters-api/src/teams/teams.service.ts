import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { CharactersService } from '../characters/characters.service.js';
import { ConfigService } from '@nestjs/config';
import { Team } from './entities/team.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsService {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly configService: ConfigService,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return this.teamsRepository.find();
  }

  async findOne(id: number) {
    const result: Team | null  = await this.teamsRepository.findOneBy({ id });
    if(result === null) {
  
      throw new NotFoundException(`El equipo con el id ${id} no existe`)
    }

    return result
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
