import { CharactersService } from './characters.service.js';
import { CreateCharacterDto } from './dto/create-character.dto.js';
import { UpdateCharacterDto } from './dto/update-character.dto.js';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    create(createCharacterDto: CreateCharacterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: string): string;
}
