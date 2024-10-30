/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `batches` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `batches_number_key` ON `batches`(`number`);
