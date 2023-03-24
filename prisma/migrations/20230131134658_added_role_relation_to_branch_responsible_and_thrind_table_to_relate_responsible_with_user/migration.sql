/*
  Warnings:

  - Added the required column `branchId` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role` ADD COLUMN `branchId` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `responsible` (
    `id` CHAR(36) NOT NULL,
    `name` CHAR(64) NOT NULL,
    `cpf` CHAR(14) NOT NULL,
    `phone` CHAR(16) NOT NULL,
    `dt_nascimento` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_responsible` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `responsibleId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_responsible` ADD CONSTRAINT `user_responsible_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `responsible`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_responsible` ADD CONSTRAINT `user_responsible_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
