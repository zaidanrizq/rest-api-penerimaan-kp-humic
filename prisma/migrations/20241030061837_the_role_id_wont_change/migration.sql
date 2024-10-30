/*
  Warnings:

  - Added the required column `anjay` to the `kp_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kp_applications` ADD COLUMN `anjay` INTEGER NOT NULL;
