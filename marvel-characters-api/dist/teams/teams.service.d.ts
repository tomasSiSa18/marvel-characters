import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
export declare class TeamsService {
    create(createTeamDto: CreateTeamDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTeamDto: UpdateTeamDto): string;
    remove(id: number): string;
}
