import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764846575595 implements MigrationInterface {
    name = 'Migration1764846575595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(30) NOT NULL, \`name\` varchar(30) NOT NULL, \`password\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
