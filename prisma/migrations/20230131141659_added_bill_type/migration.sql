/*
  Warnings:

  - Added the required column `status` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` ADD COLUMN `status` VARCHAR(15) NOT NULL;
