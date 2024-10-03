-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(72) NOT NULL,
    `birth_date` DATETIME(3) NULL,
    `gender` ENUM('M', 'F') NULL,
    `nim` VARCHAR(10) NOT NULL,
    `perguruan_tinggi` ENUM('TEL_U_BANDUNG', 'TEL_U_JAKARTA', 'TEL_U_PURWOKERTO', 'TEL_U_SURABAYA') NOT NULL,
    `prodi` VARCHAR(72) NOT NULL,
    `cv` VARCHAR(320) NULL,
    `portfolio` VARCHAR(320) NULL,
    `phone_number` VARCHAR(13) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(72) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_nim_key`(`nim`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
