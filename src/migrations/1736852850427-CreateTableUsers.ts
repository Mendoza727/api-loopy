import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1736852850427 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR NOT NULL,
                "email" VARCHAR NOT NULL,
                "password" VARCHAR NOT NULL,
                "avatar" VARCHAR NOT NULL,
                "followers" INT NOT NULL,
                "following" INT NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
