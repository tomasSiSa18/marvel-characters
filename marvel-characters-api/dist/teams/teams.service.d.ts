import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { CharactersService } from '../characters/characters.service.js';
import { ConfigService } from '@nestjs/config';
import { Team } from './entities/team.entity.js';
import { Repository } from 'typeorm';
export declare class TeamsService {
    private readonly charactersService;
    private readonly configService;
    private teamRepository;
    constructor(charactersService: CharactersService, configService: ConfigService, teamRepository: Repository<Team>);
    create(createTeamDto: CreateTeamDto): string;
    findAll(): Promise<Team[]>;
    findOne(id: number): string;
    update(id: number, updateTeamDto: UpdateTeamDto): string;
    remove(id: number): string;
}
