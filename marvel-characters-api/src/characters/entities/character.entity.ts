import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, Relation } from "typeorm";
import { CharacterStatus } from "../enums/character-status.enum.js";
import { Team } from "../../teams/entities/team.entity.js";

@Entity('characters')
export class Character {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 100})
    real_name: string
    @Column({type: 'varchar', length: 100, unique: true})
    alias: string  
    @Column({type: 'varchar', length: 150 })
    main_power: string
    @Column({type: 'int'})
    power_level: number
    @Column({type: 'varchar', length: 20, default: CharacterStatus.ACTIVE})
    status: CharacterStatus
    @Column({type: 'boolean', default: false})
    is_villain: boolean
    @Column({type: 'int', nullable: true})
    team_id: number | null
    @ManyToOne(() => Team, (team) => team.characters, { nullable: true })
    @JoinColumn({ name: 'team_id' })
    team: Relation<Team> | null
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}
