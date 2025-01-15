import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' }) // Nombre de la columna de la clave foránea
    user: User;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    url: string;
    
    @Column({ default: 0 })
    likes: string;

    @Column({ default: 0 })
    comments: number;

    @Column()
    hashtags: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
