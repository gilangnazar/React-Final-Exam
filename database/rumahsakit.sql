-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2025 at 07:52 PM
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
(1, 1, '2025-07-08', 1, 1, 'cancelled', '2025-07-07 07:37:21', NULL),
(2, 2, '2025-07-09', 3, 2, 'confirmed', '2025-07-07 07:37:21', NULL),
(3, 3, '2025-07-08', 1, 1, 'cancelled', '2025-07-12 12:26:08', NULL),
(4, 3, '2025-07-16', 1, 1, 'cancelled', '2025-07-16 11:53:04', NULL),
(5, 1, '2025-07-16', 1, 1, 'confirmed', '2025-07-16 12:08:57', NULL),
(6, 1, '2025-07-20', 1, 1, 'confirmed', '2025-07-20 16:36:24', NULL);

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
(1, 'Umum', 'Pelayanan umum dan pemeriksaan dasar', NULL),
(2, 'Gigi', 'Poli khusus gigi dan mulut', NULL),
(3, 'Anak', 'Spesialisasi anak-anak', NULL),
(4, 'Neuro', 'Poli khusus Otak', NULL);

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
(1, 2, 1, 'Dokter Umum', NULL),
(2, 3, 3, 'Dokter Anak', NULL),
(3, 9, 2, 'Bedah', NULL);

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

--
-- Dumping data for table `examinations`
--

INSERT INTO `examinations` (`exam_id`, `appointment_id`, `doctor_id`, `complaint`, `diagnosis`, `notes`, `exam_date`, `deleted_at`) VALUES
(1, 2, 2, 'Demam dan batuk', 'Infeksi ringan', 'Minum obat 3x sehari', '2025-07-09 09:15:00', NULL),
(2, 6, 1, 'Pusing', 'Kurang Darah', 'Minum Tablet Penambah Darah', '2025-07-20 02:28:04', NULL);

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
(1, 'Paracetamol', 100, 5000.00, NULL),
(2, 'Amoxicillin', 50, 10000.00, NULL),
(3, 'Vitamin C', 75, 3000.00, NULL),
(4, 'Ibuprofen', 40, 7000.00, NULL);

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

--
-- Dumping data for table `medicine_pickups`
--

INSERT INTO `medicine_pickups` (`pickup_id`, `prescription_id`, `pickup_date`, `picked_by`, `deleted_at`) VALUES
(1, 1, '2025-07-09 10:00:00', 6, NULL);

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
(1, 4, '3201012345670001', 'L', '1990-05-10', '081234567890', 'Jl. Merdeka No.1', NULL),
(2, 5, '3201012345670002', 'P', '1995-08-20', '082345678901', 'Jl. Sudirman No.2', NULL),
(3, 11, '32123456', 'L', '2001-05-05', '0895', 'Bogor', NULL),
(4, 16, NULL, NULL, NULL, NULL, NULL, NULL);

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

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `appointment_id`, `total_amount`, `payment_method`, `payment_status`, `payment_date`, `deleted_at`) VALUES
(1, 2, 35000.00, 'cash', 'paid', '2025-07-09 09:30:00', NULL);

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

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`prescription_id`, `exam_id`, `created_at`, `deleted_at`) VALUES
(1, 1, '2025-07-07 07:37:21', NULL),
(2, 2, '2025-07-19 19:47:04', NULL),
(3, 2, '2025-07-19 19:48:34', NULL);

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

--
-- Dumping data for table `prescription_items`
--

INSERT INTO `prescription_items` (`item_id`, `prescription_id`, `medicine_id`, `dosage`, `quantity`, `instructions`, `deleted_at`) VALUES
(1, 1, 1, '500mg', 10, '3x sehari setelah makan', NULL),
(2, 1, 3, '100mg', 5, '2x sehari pagi dan malam', NULL),
(3, 3, 1, '3x1', 10, 'Setelah makan', NULL),
(4, 3, 3, '2x1', 5, 'Sebelum tidur', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `queue_id` int NOT NULL,
  `appointment_id` int DEFAULT NULL,
  `queue_number` int DEFAULT NULL,
  `status` enum('waiting','called','done','calling') DEFAULT NULL,
  `call_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
);

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`queue_id`, `appointment_id`, `queue_number`, `status`, `call_time`, `created_at`, `deleted_at`) VALUES
(1, 1, 1, 'done', NULL, '2025-07-18 08:56:50', NULL),
(2, 2, 2, 'done', NULL, '2025-07-18 08:56:50', NULL),
(6, 5, 1, 'done', NULL, '2025-07-18 15:38:54', NULL),
(8, 6, 1, 'calling', NULL, '2025-07-19 16:53:17', NULL);

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
(6, 'pendaftaran', NULL),
(7, 'Office Girl', '2025-07-12 09:47:08');

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
(1, 'admin1', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Admin Rumah Sakit', 1, 'active', '2025-07-07 07:37:21', NULL),
(2, 'drjoko', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Dr. Joko', 2, 'active', '2025-07-07 07:37:21', NULL),
(3, 'gilangacc', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'gilangacchadipa', 6, 'active', '2025-07-07 07:37:21', NULL),
(4, 'budi123', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Budi Santoso', 3, 'active', '2025-07-07 07:37:21', NULL),
(5, 'sari567', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Sari Lestari', 3, 'active', '2025-07-07 07:37:21', NULL),
(6, 'apotek1', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Apoteker Andi', 4, 'active', '2025-07-07 07:37:21', NULL),
(7, 'kasir1', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Kasir Rina', 5, 'active', '2025-07-07 07:37:21', NULL),
(8, 'daftar1', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Pendaftaran Wati', 6, 'active', '2025-07-07 07:37:21', NULL),
(9, 'drjatmiko', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'Dr. Jatmiko', 2, 'active', '2025-07-07 07:37:21', NULL),
(10, 'daftargilangnz', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'gilangnazar', 6, 'active', '2025-07-12 09:28:08', NULL),
(11, 'pasien7', '$2b$10$k4n3FQxX66WHZ1L1cx3UwecE2VFSMFjsa16nnQxoqGACPz8RyJ4ey', 'hansolo', 3, 'active', '2025-07-12 11:25:10', NULL),
(16, 'gilangnazar', '$2b$10$jCSxXcF1iD7w1l6mEdJIAuzJss1iiWyX1D6tUBHlHhgVMTqAx/7nq', 'Gilang Nazar Pasien', 3, 'active', '2025-07-19 16:32:00', NULL);

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
-- Dumping data for table `user_access_logs`
--

INSERT INTO `user_access_logs` (`log_id`, `user_id`, `activity`, `log_time`) VALUES
(1, 1, 'Login admin', '2025-07-07 07:37:21'),
(2, 2, 'Melihat daftar pasien', '2025-07-07 07:37:21'),
(3, 4, 'Mendaftar appointment', '2025-07-07 07:37:21');

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
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `examinations`
--
ALTER TABLE `examinations`
  MODIFY `exam_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `medicine_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medicine_pickups`
--
ALTER TABLE `medicine_pickups`
  MODIFY `pickup_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `prescription_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prescription_items`
--
ALTER TABLE `prescription_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `queue_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_access_logs`
--
ALTER TABLE `user_access_logs`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
