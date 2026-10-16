var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
let Team = class Team {
    id;
    name;
    base;
    founded_year;
    active;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", Object)
], Team.prototype, "base", void 0);
__decorate([
    Column({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Team.prototype, "founded_year", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Team.prototype, "active", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Team.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Team.prototype, "updated_at", void 0);
Team = __decorate([
    Entity('teams')
], Team);
export { Team };
//# sourceMappingURL=team.entity.js.map