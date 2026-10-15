var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { TeamsController } from './teams.controller.js';
import { CharactersModule } from '../characters/characters.module.js';
let TeamsModule = class TeamsModule {
};
TeamsModule = __decorate([
    Module({
        imports: [CharactersModule],
        controllers: [TeamsController],
        providers: [TeamsService],
    })
], TeamsModule);
export { TeamsModule };
//# sourceMappingURL=teams.module.js.map