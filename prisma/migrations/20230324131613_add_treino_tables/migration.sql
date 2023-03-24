-- CreateTable
CREATE TABLE `treinos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `objetivo` ENUM('Hipertrofia', 'Forca', 'Emagrecer', 'CondicionamentoFisico') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercicios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `series` INTEGER NOT NULL,
    `repeticoes` INTEGER NOT NULL,
    `tempoDeDescanso` INTEGER NOT NULL,
    `treinoId` INTEGER NOT NULL,

    UNIQUE INDEX `exercicios_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinos` ADD CONSTRAINT `treinos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercicios` ADD CONSTRAINT `exercicios_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treinos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
