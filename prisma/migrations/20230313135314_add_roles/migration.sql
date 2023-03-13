/*
  Warnings:

  - You are about to drop the column `role` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `professores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `role`,
    ADD COLUMN `roles` ENUM('Professor', 'Aluno') NOT NULL DEFAULT 'Aluno';

-- AlterTable
ALTER TABLE `professores` DROP COLUMN `role`,
    ADD COLUMN `roles` ENUM('Professor', 'Aluno') NOT NULL DEFAULT 'Professor';
