import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Video } from './videos.model';
import { User } from './user.model';

@Entity('comments')
export class CommentVideo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' }) // Nombre de la columna de la clave foránea

    @ManyToOne(() => Video)
    @JoinColumn({ name: 'video_id' }) // Nombre de la columna de la clave foránea

    @Column({ nullable: true })
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
