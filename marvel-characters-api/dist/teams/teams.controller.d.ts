import { TeamsService } from './teams.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto): string;
    findAll(): Promise<import("./entities/team.entity.js").Team[]>;
    findOne(id: string): string;
    update(id: string, updateTeamDto: UpdateTeamDto): string;
    remove(id: string): string;
}
