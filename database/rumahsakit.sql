-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 26, 2025 at 04:04 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumahsakit`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `schedule_date` date DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `status` enum('waiting','confirmed','cancelled','completed') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patient_id`, `schedule_date`, `department_id`, `doctor_id`, `status`, `created_at`, `deleted_at`) VALUES
(1, 1, '2025-07-26', 1, 1, 'confirmed', '2025-07-26 15:54:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `description`, `deleted_at`) VALUES
(1, 'Poli Umum', 'Pelayanan pemeriksaan umum untuk semua usia', NULL),
(2, 'Poli Gigi', 'Pelayanan kesehatan gigi dan mulut', NULL),
(3, 'Poli Anak', 'Pelayanan kesehatan anak dan balita', NULL),
(4, 'Poli Kandungan', 'Pelayanan kebidanan dan kandungan', NULL),
(5, 'Poli Saraf', 'Pelayanan neurologi dan saraf', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `user_id`, `department_id`, `specialization`, `deleted_at`) VALUES
(1, 3, 1, 'Dokter Umum', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `examinations`
--

CREATE TABLE `examinations` (
  `exam_id` int NOT NULL,
  `appointment_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `complaint` text,
  `diagnosis` text,
  `notes` text,
  `exam_date` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `medicine_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`medicine_id`, `name`, `stock`, `price`, `deleted_at`) VALUES
(1, 'Paracetamol 500mg', 200, 1500.00, NULL),
(2, 'Amoxicillin 500mg', 150, 2500.00, NULL),
(3, 'Salbutamol Tablet', 100, 1800.00, NULL),
(4, 'Antasida Doen', 120, 1300.00, NULL),
(5, 'Vitamin C 500mg', 300, 1000.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `medicine_pickups`
--

CREATE TABLE `medicine_pickups` (
  `pickup_id` int NOT NULL,
  `prescription_id` int DEFAULT NULL,
  `pickup_date` datetime DEFAULT NULL,
  `picked_by` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `gender` enum('L','P') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `user_id`, `nik`, `gender`, `birth_date`, `phone`, `address`, `deleted_at`) VALUES
(1, 1, '3271012300010001', 'L', '1990-05-14', '081234567890', 'Jl. Merdeka No. 10, Bandung', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int NOT NULL,
  `appointment_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_method` enum('cash','card','insurance') DEFAULT NULL,
  `payment_status` enum('unpaid','paid','pending') DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `prescription_id` int NOT NULL,
  `exam_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `prescription_items`
--

CREATE TABLE `prescription_items` (
  `item_id` int NOT NULL,
  `prescription_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `instructions` text,
  `deleted_at` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `queue_id` int NOT NULL,
  `appointment_id` int DEFAULT NULL,
  `queue_number` int DEFAULT NULL,
  `status` enum('waiting','done','calling') DEFAULT NULL,
  `call_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`queue_id`, `appointment_id`, `queue_number`, `status`, `call_time`, `created_at`, `deleted_at`) VALUES
(1, 1, 1, 'calling', '2025-07-26 22:55:58', '2025-07-26 15:55:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `deleted_at`) VALUES
(1, 'admin', NULL),
(2, 'dokter', NULL),
(3, 'pasien', NULL),
(4, 'apoteker', NULL),
(5, 'kasir', NULL),
(6, 'pendaftaran', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `full_name`, `role_id`, `status`, `created_at`, `deleted_at`) VALUES
(1, 'pasien01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Ahmad Ridwan', 3, 'active', '2025-07-26 15:48:23', NULL),
(2, 'pendaftaran01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Siti Maesaroh', 6, 'active', '2025-07-26 15:48:23', NULL),
(3, 'dokter01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Dr. Budi Santoso', 2, 'active', '2025-07-26 15:48:23', NULL),
(4, 'kasir01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Dewi Kartika', 5, 'active', '2025-07-26 15:48:23', NULL),
(5, 'apoteker01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Agus Pranowo', 3, 'active', '2025-07-26 15:48:23', NULL),
(6, 'admin01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Lina Wahyuni', 1, 'active', '2025-07-26 15:48:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_access_logs`
--

CREATE TABLE `user_access_logs` (
  `log_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `log_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `examinations`
--
ALTER TABLE `examinations`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`medicine_id`);

--
-- Indexes for table `medicine_pickups`
--
ALTER TABLE `medicine_pickups`
  ADD PRIMARY KEY (`pickup_id`),
  ADD KEY `prescription_id` (`prescription_id`),
  ADD KEY `picked_by` (`picked_by`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`prescription_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `prescription_items`
--
ALTER TABLE `prescription_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `prescription_id` (`prescription_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`queue_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_access_logs`
--
ALTER TABLE `user_access_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `examinations`
--
ALTER TABLE `examinations`
  MODIFY `exam_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `medicine_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicine_pickups`
--
ALTER TABLE `medicine_pickups`
  MODIFY `pickup_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `prescription_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription_items`
--
ALTER TABLE `prescription_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `queue_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_access_logs`
--
ALTER TABLE `user_access_logs`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `examinations`
--
ALTER TABLE `examinations`
  ADD CONSTRAINT `examinations_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`),
  ADD CONSTRAINT `examinations_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`);

--
-- Constraints for table `medicine_pickups`
--
ALTER TABLE `medicine_pickups`
  ADD CONSTRAINT `medicine_pickups_ibfk_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`prescription_id`),
  ADD CONSTRAINT `medicine_pickups_ibfk_2` FOREIGN KEY (`picked_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `examinations` (`exam_id`);

--
-- Constraints for table `prescription_items`
--
ALTER TABLE `prescription_items`
  ADD CONSTRAINT `prescription_items_ibfk_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`prescription_id`),
  ADD CONSTRAINT `prescription_items_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);

--
-- Constraints for table `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `queues_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_access_logs`
--
ALTER TABLE `user_access_logs`
  ADD CONSTRAINT `user_access_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
