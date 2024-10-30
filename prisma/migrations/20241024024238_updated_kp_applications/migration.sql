/*
  Warnings:

  - You are about to drop the column `Status` on the `kp_applications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `kp_applications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `kp_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kp_applications` DROP COLUMN `Status`,
    ADD COLUMN `status` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `kp_applications_user_id_key` ON `kp_applications`(`user_id`);
