/*
  Warnings:

  - You are about to drop the column `dt_nascimento` on the `administrator` table. All the data in the column will be lost.
  - Added the required column `birth` to the `administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrator` DROP COLUMN `dt_nascimento`,
    ADD COLUMN `birth` DATE NOT NULL;
