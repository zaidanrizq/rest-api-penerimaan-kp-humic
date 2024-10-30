/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `kp_roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `kp_roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kp_roles` ADD COLUMN `slug` VARCHAR(72) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `kp_roles_slug_key` ON `kp_roles`(`slug`);
