/*
  Warnings:

  - You are about to drop the column `dt_nascimento` on the `responsible` table. All the data in the column will be lost.
  - Added the required column `birth` to the `responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `responsible` DROP COLUMN `dt_nascimento`,
    ADD COLUMN `birth` DATE NOT NULL,
    ADD COLUMN `image_path` VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `description` VARCHAR(2048) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `image_path` VARCHAR(512) NOT NULL;
