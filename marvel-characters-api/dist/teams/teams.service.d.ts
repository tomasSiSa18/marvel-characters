import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { CharactersService } from '../characters/characters.service.js';
export declare class TeamsService {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    create(createTeamDto: CreateTeamDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTeamDto: UpdateTeamDto): string;
    remove(id: number): string;
}
