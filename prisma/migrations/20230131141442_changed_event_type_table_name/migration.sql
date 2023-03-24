/*
  Warnings:

  - You are about to drop the column `eventTypeId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the `eventType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_typeId` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_eventTypeId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `eventTypeId`,
    ADD COLUMN `event_typeId` CHAR(36) NOT NULL;

-- DropTable
DROP TABLE `eventType`;

-- CreateTable
CREATE TABLE `event_type` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_event_typeId_fkey` FOREIGN KEY (`event_typeId`) REFERENCES `event_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
