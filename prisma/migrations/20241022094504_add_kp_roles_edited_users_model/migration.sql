/*
  Warnings:

  - You are about to alter the column `gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Char(1)`.
  - Made the column `perguruan_tinggi` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `profile_picture` VARCHAR(2083) NULL,
    MODIFY `gender` CHAR(1) NULL,
    MODIFY `perguruan_tinggi` VARCHAR(35) NOT NULL;

-- CreateTable
CREATE TABLE `kp_roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(72) NOT NULL,
    `description` TEXT NOT NULL,
    `kualifikasi` TEXT NOT NULL,
    `role_image` VARCHAR(2083) NOT NULL,
    `opened_at` DATETIME(3) NOT NULL,
    `closed_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
