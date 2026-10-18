import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { AssignCharactersDto } from './dto/assign-characters.dto.js';
import { Team } from './entities/team.entity.js';
import { CharactersService } from '../characters/characters.service.js';

@Injectable()
export class TeamsService {
  constructor(
    private readonly charactersService: CharactersService,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { characterIds, ...teamData } = createTeamDto;
    const idsToAssign = characterIds ?? [];

    if (idsToAssign.length > 0 && teamData.active === false) {
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

    if (idsToAssign.length > 0) {
      await this.charactersService.ensureCharactersExist(idsToAssign);
    }

    const create = this.teamsRepository.create(teamData);
    const savedTeam = await this.teamsRepository.save(create);

    if (idsToAssign.length > 0) {
      await this.charactersService.assignToTeam(savedTeam.id, idsToAssign);
    }

    const characters = await this.charactersService.findAll({
      teamId: savedTeam.id,
    });

    return { ...savedTeam, characters };
  }

  findAll() {
    return this.teamsRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const result: Team | null = await this.teamsRepository.findOneBy({ id });
    if (result === null) {
      throw new NotFoundException(`El equipo con el id ${id} no existe`);
    }

    return result;
  }

  async findCharacters(id: number) {
    await this.findOne(id);

    return this.charactersService.findAll({ teamId: id });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const teamToUpdate = await this.findOne(id);

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

  async assignCharacters(id: number, assignCharactersDto: AssignCharactersDto) {
    const team = await this.findOne(id);

    if (!team.active) {
      throw new BadRequestException(
        `El equipo ${team.name} no está activo, no se le pueden asignar personajes`,
      );
    }

    await this.charactersService.assignToTeam(
      id,
      assignCharactersDto.characterIds,
    );

    return this.charactersService.findAll({ teamId: id });
  }

  async remove(id: number) {
    const team = await this.findOne(id);

    const charactersCount = await this.charactersService.countByTeam(id);

    if (charactersCount > 0) {
      throw new ConflictException(
        `El equipo ${team.name} tiene ${charactersCount} personajes asociados. Para cerrarlo, desactívalo con PUT (active: false)`,
      );
    }

    await this.teamsRepository.delete(id);

    return team;
  }
}
