import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751433904914 implements MigrationInterface {
    name = 'Init1751433904914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b8512aa9cef03d90ed5744c94d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurant_id\` int NOT NULL, \`name\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`category\` enum ('양식', '일식', '중식') NOT NULL, \`description\` text NULL, \`isAvailable\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a8bb3519a45e021a147bc87e49\` (\`name\`), INDEX \`IDX_36d69a044fe38765f2c80ebab0\` (\`price\`), INDEX \`IDX_5ce726141e243c5afdfaeffc7f\` (\`category\`), INDEX \`IDX_bcd4a935c967cc9c20e770d1e6\` (\`restaurant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation_menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reservation_id\` int NOT NULL, \`menu_id\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe5a602a31c486a853c43aa77c\` (\`menu_id\`), UNIQUE INDEX \`IDX_bd52e865c0eac422f888a00879\` (\`reservation_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`customer_id\` int NOT NULL, \`restaurant_id\` int NOT NULL, \`reservationDate\` date NOT NULL, \`startTime\` time NOT NULL, \`endTime\` time NOT NULL, \`phone\` varchar(20) NOT NULL, \`memberSize\` int NOT NULL DEFAULT '1', \`status\` enum ('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_59706906c7876674d472b4c1cc\` (\`restaurant_id\`, \`reservationDate\`, \`startTime\`, \`endTime\`), INDEX \`IDX_1f6a758a1f84714ae9ed1e79a9\` (\`memberSize\`), INDEX \`IDX_a9355fdf6727720771d5e2ff35\` (\`phone\`), INDEX \`IDX_f63cb79a34cdf2d47ab23f31a8\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a6d82a35be7467761ee3a1a309\` (\`userId\`), INDEX \`IDX_8a604e4f3984d3a2937c1f7879\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_bcd4a935c967cc9c20e770d1e62\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_bd52e865c0eac422f888a008797\` FOREIGN KEY (\`reservation_id\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_fe5a602a31c486a853c43aa77cd\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_f63cb79a34cdf2d47ab23f31a8b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_ee6b00404309108652a2307c66c\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_ee6b00404309108652a2307c66c\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_f63cb79a34cdf2d47ab23f31a8b\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_fe5a602a31c486a853c43aa77cd\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_bd52e865c0eac422f888a008797\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_bcd4a935c967cc9c20e770d1e62\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a604e4f3984d3a2937c1f7879\` ON \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6d82a35be7467761ee3a1a309\` ON \`restaurants\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_f63cb79a34cdf2d47ab23f31a8\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9355fdf6727720771d5e2ff35\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f6a758a1f84714ae9ed1e79a9\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_59706906c7876674d472b4c1cc\` ON \`reservations\``);
        await queryRunner.query(`DROP TABLE \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd52e865c0eac422f888a00879\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe5a602a31c486a853c43aa77c\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP TABLE \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_bcd4a935c967cc9c20e770d1e6\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ce726141e243c5afdfaeffc7f\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8bb3519a45e021a147bc87e49\` ON \`menus\``);
        await queryRunner.query(`DROP TABLE \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8512aa9cef03d90ed5744c94d\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
