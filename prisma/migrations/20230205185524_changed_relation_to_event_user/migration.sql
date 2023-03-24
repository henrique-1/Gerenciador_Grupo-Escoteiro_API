/*
  Warnings:

  - Made the column `userId` on table `event_user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `event_user` DROP FOREIGN KEY `event_user_userId_fkey`;

-- AlterTable
ALTER TABLE `event_user` MODIFY `userId` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `event_user` ADD CONSTRAINT `event_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
