import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

}
