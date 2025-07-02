import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751439725814 implements MigrationInterface {
    name = 'Init1751439725814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`isAvailable\``);
        await queryRunner.query(`DROP INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`deletedAt\` timestamp NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\` (\`price\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`deletedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`price\` decimal NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\` (\`price\`)`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT '1'`);
    }

}
