/*
  Warnings:

  - You are about to drop the column `closed_at` on the `kp_roles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `kp_roles` table. All the data in the column will be lost.
  - You are about to drop the column `opened_at` on the `kp_roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `kp_roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role_id]` on the table `kp_applications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch_id` to the `kp_roles` table without a default value. This is not possible if the table is not empty.
  - Made the column `portfolio` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `kp_roles` DROP COLUMN `closed_at`,
    DROP COLUMN `created_at`,
    DROP COLUMN `opened_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `batch_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `portfolio` VARCHAR(320) NOT NULL;

-- CreateTable
CREATE TABLE `batches` (
    `batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` CHAR(1) NOT NULL,
    `opened_at` DATETIME(3) NOT NULL,
    `closed_at` DATETIME(3) NOT NULL,
    `semester` VARCHAR(6) NOT NULL,
    `year` VARCHAR(4) NOT NULL,

    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `kp_applications_role_id_key` ON `kp_applications`(`role_id`);

-- AddForeignKey
ALTER TABLE `kp_roles` ADD CONSTRAINT `kp_roles_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `batches`(`batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
