-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_bioId_fkey`;

-- AlterTable
ALTER TABLE `Skill` MODIFY `bioId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_bioId_fkey` FOREIGN KEY (`bioId`) REFERENCES `Bio`(`identifier`) ON DELETE RESTRICT ON UPDATE CASCADE;
