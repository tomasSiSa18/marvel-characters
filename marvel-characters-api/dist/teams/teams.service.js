var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service.js';
import { ConfigService } from '@nestjs/config';
import { Team } from './entities/team.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
let TeamsService = class TeamsService {
    charactersService;
    configService;
    teamRepository;
    constructor(charactersService, configService, teamRepository) {
        this.charactersService = charactersService;
        this.configService = configService;
        this.teamRepository = teamRepository;
    }
    create(createTeamDto) {
        return 'This action adds a new team';
    }
    findAll() {
        return this.teamRepository.find();
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
    __param(2, InjectRepository(Team)),
    __metadata("design:paramtypes", [CharactersService,
        ConfigService,
        Repository])
], TeamsService);
export { TeamsService };
//# sourceMappingURL=teams.service.js.map