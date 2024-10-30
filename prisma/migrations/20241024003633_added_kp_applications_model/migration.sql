-- CreateTable
CREATE TABLE `kp_applications` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `Status` VARCHAR(10) NOT NULL,
    `application_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kp_applications` ADD CONSTRAINT `kp_applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kp_applications` ADD CONSTRAINT `kp_applications_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `kp_roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
