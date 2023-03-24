/*
  Warnings:

  - Added the required column `image_path` to the `administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `image_path` VARCHAR(512) NOT NULL;
