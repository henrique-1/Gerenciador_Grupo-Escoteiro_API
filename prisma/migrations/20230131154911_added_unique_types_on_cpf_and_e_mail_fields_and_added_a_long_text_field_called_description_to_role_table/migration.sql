/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` CHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `description` LONGTEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `administrator_cpf_key` ON `administrator`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `administrator_email_key` ON `administrator`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `responsible_cpf_key` ON `responsible`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `user_cpf_key` ON `user`(`cpf`);
