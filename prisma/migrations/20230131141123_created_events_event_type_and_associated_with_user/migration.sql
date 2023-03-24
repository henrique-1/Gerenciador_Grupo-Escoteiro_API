/*
  Warnings:

  - You are about to alter the column `groupId` on the `users_group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `userId` on the `users_group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `roleId` on the `users_group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - Added the required column `branchId` to the `administrator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users_group` DROP FOREIGN KEY `users_group_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `users_group` DROP FOREIGN KEY `users_group_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `users_group` DROP FOREIGN KEY `users_group_userId_fkey`;

-- AlterTable
ALTER TABLE `administrator` ADD COLUMN `branchId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `users_group` MODIFY `groupId` CHAR(36) NOT NULL,
    MODIFY `userId` CHAR(36) NOT NULL,
    MODIFY `roleId` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `eventType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `eventTypeId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_user` (
    `id` CHAR(36) NOT NULL,
    `eventId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_group` ADD CONSTRAINT `users_group_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_group` ADD CONSTRAINT `users_group_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_group` ADD CONSTRAINT `users_group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `administrator` ADD CONSTRAINT `administrator_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_eventTypeId_fkey` FOREIGN KEY (`eventTypeId`) REFERENCES `eventType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_user` ADD CONSTRAINT `event_user_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_user` ADD CONSTRAINT `event_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
