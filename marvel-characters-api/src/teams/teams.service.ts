import { Injectable } from '@nestjs/common';
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
    private teamRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return this.teamRepository.find();
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
