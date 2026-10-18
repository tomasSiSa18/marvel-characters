import {BadRequestException,ConflictException,Injectable,NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto.js';
import { UpdateCharacterDto } from './dto/update-character.dto.js';
import { UpdateCharacterStatusDto } from './dto/update-character-status.dto.js';
import { FilterCharactersDto } from './dto/filter-characters.dto.js';
import { Character } from './entities/character.entity.js';
import { CharacterStatus } from './enums/character-status.enum.js';
import { Team } from '../teams/entities/team.entity.js';


@Injectable()
export class CharactersService {

  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

    async create(createCharacterDto: CreateCharacterDto) {
    const existentCharacter = await this.charactersRepository.findOneBy({alias: createCharacterDto.alias,});

    if (existentCharacter) {
      throw new ConflictException(
        `Ya existe un personaje con el alias ${createCharacterDto.alias}`,
      );
    }

    if (
      createCharacterDto.team_id !== undefined && createCharacterDto.team_id !== null
    ) {
      await this.validateTeam(createCharacterDto.team_id);
    }

    const newCharacter = this.charactersRepository.create(createCharacterDto);

    return this.charactersRepository.save(newCharacter);
  }


  findAll(filters: FilterCharactersDto = {}) {
    const where: FindOptionsWhere<Character> = {};

    if (filters.status !== undefined) {
      where.status = filters.status;
    }

    if (filters.teamId !== undefined) {
      where.team_id = filters.teamId;
    }

    return this.charactersRepository.find({ where, order: { id: 'ASC' } });
  }


  async findOne(id: number) {
    const character = await this.charactersRepository.findOne({
      where: { id },
      relations: { team: true },
    });

    if (character === null) {
      throw new NotFoundException(`El personaje con el id ${id} no existe`);
    }

    return character;
  }


  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const characterToUpdate = await this.findCharacterOrFail(id);

    const existentCharacter = await this.charactersRepository.findOneBy({
      alias: updateCharacterDto.alias,
    });

    if (existentCharacter && existentCharacter.id !== id) {
      throw new ConflictException(
        `Ya existe un personaje con el alias ${updateCharacterDto.alias}`,
      );
    }

    const finalData = {
      ...updateCharacterDto,
      status: updateCharacterDto.status ?? CharacterStatus.ACTIVE,
      is_villain: updateCharacterDto.is_villain ?? false,
      team_id: updateCharacterDto.team_id ?? null,
    };

    this.validateStatusTransition(characterToUpdate.status, finalData.status);

    if (finalData.team_id !== null) {
      await this.validateTeam(finalData.team_id);
    }

    this.charactersRepository.merge(characterToUpdate, finalData);
    await this.charactersRepository.save(characterToUpdate);

    return this.findOne(id);
  }

  async updateStatus(
    id: number,
    updateCharacterStatusDto: UpdateCharacterStatusDto,
  ) {
    const character = await this.findCharacterOrFail(id);

    this.validateStatusTransition(
      character.status,
      updateCharacterStatusDto.status,
    );

    character.status = updateCharacterStatusDto.status;

    return this.charactersRepository.save(character);
  }

  async remove(id: number) {
    const character = await this.findOne(id);

    await this.charactersRepository.delete(id);

    return character;
  }

    private async findCharacterOrFail(id: number) {
    const character = await this.charactersRepository.findOneBy({ id });

    if (character === null) {
      throw new NotFoundException(`El personaje con el id ${id} no existe`);
    }

    return character;
  }

  private async validateTeam(teamId: number) {
    const team = await this.teamsRepository.findOneBy({ id: teamId });

    if (team === null) {
      throw new NotFoundException(`El equipo con el id ${teamId} no existe`);
    }

    if (!team.active) {
      throw new BadRequestException(
        `El equipo ${team.name} no está activo, no se le pueden asignar personajes`,
      );
    }
  }

  private validateStatusTransition(
    current: CharacterStatus,
    next: CharacterStatus,
  ) {
    if (current === CharacterStatus.RETIRED && next === CharacterStatus.INJURED) {
      throw new BadRequestException(
        'Un personaje RETIRED no puede pasar directamente a INJURED',
      );
    }
  }


}
