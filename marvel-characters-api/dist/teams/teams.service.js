var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service.js';
let TeamsService = class TeamsService {
    charactersService;
    constructor(charactersService) {
        this.charactersService = charactersService;
    }
    create(createTeamDto) {
        return 'This action adds a new team';
    }
    findAll() {
        var t = '';
        const characters = this.charactersService.findAll();
        for (const c in characters) {
            t += characters[c] + ',';
        }
        return `This action returns all teams` + t;
    }
    findOne(id) {
        return `This action returns a #${id} team`;
    }
    update(id, updateTeamDto) {
        return `This action updates a #${id} team`;
    }
    remove(id) {
        return `This action removes a #${id} team`;
    }
};
TeamsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CharactersService])
], TeamsService);
export { TeamsService };
//# sourceMappingURL=teams.service.js.map