/*
  Warnings:

  - Added the required column `region_id` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `number` VARCHAR(50) NULL,
    ADD COLUMN `region_id` INTEGER NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(255) NULL,
    ADD COLUMN `work_time` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
