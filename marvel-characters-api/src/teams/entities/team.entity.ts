import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, Relation } from "typeorm";
import { Character } from "../../characters/entities/character.entity.js";

@Entity('teams')
export class Team {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 100, unique: true})
    name: string
    @Column({type: 'varchar', length: 150, nullable: true})
    base: string | null
    @Column({type: 'int', nullable: true})
    founded_year: number | null
    @Column({default: true})
    active: boolean
    @OneToMany(() => Character, (character) => character.team)
    characters: Relation<Character>[]
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

}
