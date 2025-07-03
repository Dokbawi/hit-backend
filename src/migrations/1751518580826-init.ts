import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751518580826 implements MigrationInterface {
    name = 'Init1751518580826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b8512aa9cef03d90ed5744c94d\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`restaurantId\` int NOT NULL, \`name\` varchar(100) NOT NULL, \`price\` int NOT NULL, \`category\` enum ('양식', '일식', '중식') NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, INDEX \`IDX_a8bb3519a45e021a147bc87e49\` (\`name\`), INDEX \`IDX_36d69a044fe38765f2c80ebab0\` (\`price\`), INDEX \`IDX_5ce726141e243c5afdfaeffc7f\` (\`category\`), INDEX \`IDX_62f6422b138b02c889426a1bf4\` (\`restaurantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation_menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reservationId\` int NOT NULL, \`menuId\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ea16967f7ed6509de02f4ecd1e\` (\`reservationId\`, \`menuId\`), INDEX \`IDX_19e1887a192c73a3bcaf2b5c9e\` (\`menuId\`), INDEX \`IDX_052c1a3d3868f3bbb7d5afa88a\` (\`reservationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`customerId\` int NOT NULL, \`restaurantId\` int NOT NULL, \`date\` date NOT NULL, \`startTime\` time NOT NULL, \`endTime\` time NOT NULL, \`phone\` varchar(20) NOT NULL, \`memberSize\` int NOT NULL DEFAULT '1', \`status\` enum ('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp NULL, INDEX \`IDX_d73c945edc0d28ab6d59c400bd\` (\`restaurantId\`, \`date\`, \`startTime\`, \`endTime\`), INDEX \`IDX_1f6a758a1f84714ae9ed1e79a9\` (\`memberSize\`), INDEX \`IDX_a9355fdf6727720771d5e2ff35\` (\`phone\`), INDEX \`IDX_487ec4ed757eed0d34c7ddee79\` (\`customerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a6d82a35be7467761ee3a1a309\` (\`userId\`), INDEX \`IDX_8a604e4f3984d3a2937c1f7879\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_62f6422b138b02c889426a1bf47\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_052c1a3d3868f3bbb7d5afa88aa\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` ADD CONSTRAINT \`FK_19e1887a192c73a3bcaf2b5c9e8\` FOREIGN KEY (\`menuId\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_487ec4ed757eed0d34c7ddee79b\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_f290a56fcecb987c14c68414056\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_f290a56fcecb987c14c68414056\``);
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_487ec4ed757eed0d34c7ddee79b\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_19e1887a192c73a3bcaf2b5c9e8\``);
        await queryRunner.query(`ALTER TABLE \`reservation_menus\` DROP FOREIGN KEY \`FK_052c1a3d3868f3bbb7d5afa88aa\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_62f6422b138b02c889426a1bf47\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a604e4f3984d3a2937c1f7879\` ON \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6d82a35be7467761ee3a1a309\` ON \`restaurants\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_487ec4ed757eed0d34c7ddee79\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9355fdf6727720771d5e2ff35\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f6a758a1f84714ae9ed1e79a9\` ON \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_d73c945edc0d28ab6d59c400bd\` ON \`reservations\``);
        await queryRunner.query(`DROP TABLE \`reservations\``);
        await queryRunner.query(`DROP INDEX \`IDX_052c1a3d3868f3bbb7d5afa88a\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_19e1887a192c73a3bcaf2b5c9e\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_ea16967f7ed6509de02f4ecd1e\` ON \`reservation_menus\``);
        await queryRunner.query(`DROP TABLE \`reservation_menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_62f6422b138b02c889426a1bf4\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ce726141e243c5afdfaeffc7f\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_36d69a044fe38765f2c80ebab0\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8bb3519a45e021a147bc87e49\` ON \`menus\``);
        await queryRunner.query(`DROP TABLE \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8512aa9cef03d90ed5744c94d\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
