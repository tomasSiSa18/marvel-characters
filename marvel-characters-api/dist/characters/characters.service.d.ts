import { CreateCharacterDto } from './dto/create-character.dto.js';
import { UpdateCharacterDto } from './dto/update-character.dto.js';
export declare class CharactersService {
    create(createCharacterDto: CreateCharacterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: number): string;
}
