import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: new Date()})
    start: Date;

    @Column({default: new Date()})
    end: Date;
}
