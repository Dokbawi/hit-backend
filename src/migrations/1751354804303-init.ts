import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751354804303 implements MigrationInterface {
    name = 'Init1751354804303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bd52e865c0eac422f888a00879\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe5a602a31c486a853c43aa77c\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a9f3a5f8c82ba626af97bcf73\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_585329c00f95522e5b54cd18ac\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee6b00404309108652a2307c66\` ON \`reservations\``);
        await queryRunner.query(`CREATE TABLE \`restaurant_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurant_id\` int NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('owner') NOT NULL DEFAULT 'owner', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_6fb0550eade9578a90a8310bde\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_dfeffbef9c31936dbac54733da\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_bcd4a935c967cc9c20e770d1e62\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_bd52e865c0eac422f888a008797\` FOREIGN KEY (\`reservation_id\`) REFERENCES \`reservations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_fe5a602a31c486a853c43aa77cd\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_f63cb79a34cdf2d47ab23f31a8b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_ee6b00404309108652a2307c66c\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`restaurant_accounts\` ADD CONSTRAINT \`FK_01fd8104353664c5cede262dc94\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_accounts\` DROP FOREIGN KEY \`FK_01fd8104353664c5cede262dc94\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_ee6b00404309108652a2307c66c\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_f63cb79a34cdf2d47ab23f31a8b\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_fe5a602a31c486a853c43aa77cd\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_bd52e865c0eac422f888a008797\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_bcd4a935c967cc9c20e770d1e62\``);
        await queryRunner.query(`DROP INDEX \`IDX_dfeffbef9c31936dbac54733da\` ON \`restaurants\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_6fb0550eade9578a90a8310bde\` ON \`restaurant_accounts\``);
        await queryRunner.query(`DROP TABLE \`restaurant_accounts\``);
        await queryRunner.query(`CREATE INDEX \`IDX_ee6b00404309108652a2307c66\` ON \`reservations\` (\`restaurant_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_585329c00f95522e5b54cd18ac\` ON \`reservations\` (\`startTime\`, \`endTime\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_4a9f3a5f8c82ba626af97bcf73\` ON \`reservations\` (\`reservationDate\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_fe5a602a31c486a853c43aa77c\` ON \`reservation_menus\` (\`menu_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_bd52e865c0eac422f888a00879\` ON \`reservation_menus\` (\`reservation_id\`)`);
    }

}
