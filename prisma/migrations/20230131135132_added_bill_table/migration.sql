-- AlterTable
ALTER TABLE `administrator` MODIFY `dt_nascimento` DATE NOT NULL;

-- AlterTable
ALTER TABLE `responsible` MODIFY `dt_nascimento` DATE NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `dt_nascimento` DATE NOT NULL;

-- CreateTable
CREATE TABLE `bill` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `dueDate` DATE NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
