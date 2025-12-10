import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765355808785 implements MigrationInterface {
    name = 'Migration1765355808785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deleted_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
    }

}
