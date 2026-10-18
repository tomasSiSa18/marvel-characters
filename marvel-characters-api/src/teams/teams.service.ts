import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createTeamDto: CreateTeamDto) {
    const { characterIds, ...teamData } = createTeamDto;

    if (characterIds?.length && teamData.active === false) {
      throw new BadRequestException(
        'No se puede añadir personajes a un equipo inactivo',
      );
    }

    const existentTeam = await this.teamsRepository.findOneBy({
      name: teamData.name,
    });

    if (existentTeam) {
      throw new ConflictException(`Ya existe un equipo con ${teamData.name}`);
    }

    const create = this.teamsRepository.create(teamData);

    return this.teamsRepository.save(create);
  }

  findAll() {
    return this.teamsRepository.find();
  }

  async findOne(id: number) {
    const result: Team | null = await this.teamsRepository.findOneBy({ id });
    if (result === null) {
      throw new NotFoundException(`El equipo con el id ${id} no existe`);
    }

    return result;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    let teamToUpdate = await this.findOne(id);

    const existentTeam = await this.teamsRepository.findOneBy({
      name: updateTeamDto.name,
    });

    if (existentTeam && existentTeam.id !== id) {
      throw new ConflictException(
        `Ya existe un equipo con ${updateTeamDto.name}`,
      );
    }

    const finalTeamFormal = {
      ...updateTeamDto,
      base: updateTeamDto.base ?? null,
      founded_year: updateTeamDto.founded_year ?? null,
    };

    const mergedTeam = this.teamsRepository.merge(
      teamToUpdate,
      finalTeamFormal,
    );

    return this.teamsRepository.save(mergedTeam);
  }

  remove(id: number) {
    const deleteTeam = this.findOne(id);

    //TODO: Implementar validacion de peresonajes cuando exista el servicio

    const deleteResponse = this.teamsRepository.delete({ id: id });

    return deleteTeam;
  }
}
