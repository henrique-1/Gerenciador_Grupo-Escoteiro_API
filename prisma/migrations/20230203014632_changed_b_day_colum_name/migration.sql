/*
  Warnings:

  - You are about to drop the column `dt_nascimento` on the `user` table. All the data in the column will be lost.
  - Added the required column `birth` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `dt_nascimento`,
    ADD COLUMN `birth` DATE NOT NULL;
