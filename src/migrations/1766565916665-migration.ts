import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766565916665 implements MigrationInterface {
    name = 'Migration1766565916665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` COMMENT '사용자 정보'`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`personal_id\` varchar(13) NOT NULL, \`create_user_id\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="고객 정보"`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`fk_customer_create_user\` FOREIGN KEY (\`create_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`fk_customer_create_user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`ALTER TABLE \`user\` COMMENT ''`);
    }

}
