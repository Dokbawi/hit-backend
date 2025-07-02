import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21751443282763 implements MigrationInterface {
    name = 'Init21751443282763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_59706906c7876674d472b4c1cc\` ON \`reservations\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP COLUMN \`reservationDate\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD \`deletedAt\` timestamp NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_95578bd5c0ab61da60b9650277\` ON \`reservations\` (\`restaurant_id\`, \`date\`, \`startTime\`, \`endTime\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_95578bd5c0ab61da60b9650277\` ON \`reservations\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD \`reservationDate\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_59706906c7876674d472b4c1cc\` ON \`reservations\` (\`restaurant_id\`, \`reservationDate\`, \`startTime\`, \`endTime\`)`);
    }

}
