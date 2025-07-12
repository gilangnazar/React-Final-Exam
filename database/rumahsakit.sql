-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2025 at 09:00 AM
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patient_id`, `schedule_date`, `department_id`, `doctor_id`, `status`, `created_at`) VALUES
(1, 1, '2025-07-08', 1, 1, 'waiting', '2025-07-07 07:37:21'),
(2, 2, '2025-07-09', 3, 2, 'confirmed', '2025-07-07 07:37:21');

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
  `exam_date` datetime DEFAULT NULL
);

--
-- Dumping data for table `examinations`
--

INSERT INTO `examinations` (`exam_id`, `appointment_id`, `doctor_id`, `complaint`, `diagnosis`, `notes`, `exam_date`) VALUES
(1, 2, 2, 'Demam dan batuk', 'Infeksi ringan', 'Minum obat 3x sehari', '2025-07-09 09:15:00');

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
  `picked_by` int DEFAULT NULL
);

--
-- Dumping data for table `medicine_pickups`
--

INSERT INTO `medicine_pickups` (`pickup_id`, `prescription_id`, `pickup_date`, `picked_by`) VALUES
(1, 1, '2025-07-09 10:00:00', 6);

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
  `address` text
);

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `user_id`, `nik`, `gender`, `birth_date`, `phone`, `address`) VALUES
(1, 4, '3201012345670001', 'L', '1990-05-10', '081234567890', 'Jl. Merdeka No.1'),
(2, 5, '3201012345670002', 'P', '1995-08-20', '082345678901', 'Jl. Sudirman No.2');

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
  `payment_date` datetime DEFAULT NULL
);

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `appointment_id`, `total_amount`, `payment_method`, `payment_status`, `payment_date`) VALUES
(1, 2, 35000.00, 'cash', 'paid', '2025-07-09 09:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `prescription_id` int NOT NULL,
  `exam_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`prescription_id`, `exam_id`, `created_at`) VALUES
(1, 1, '2025-07-07 07:37:21');

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
  `instructions` text
);

--
-- Dumping data for table `prescription_items`
--

INSERT INTO `prescription_items` (`item_id`, `prescription_id`, `medicine_id`, `dosage`, `quantity`, `instructions`) VALUES
(1, 1, 1, '500mg', 10, '3x sehari setelah makan'),
(2, 1, 3, '100mg', 5, '2x sehari pagi dan malam');

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `queue_id` int NOT NULL,
  `appointment_id` int DEFAULT NULL,
  `queue_number` int DEFAULT NULL,
  `status` enum('waiting','called','done') DEFAULT NULL,
  `call_time` datetime DEFAULT NULL
);

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`queue_id`, `appointment_id`, `queue_number`, `status`, `call_time`) VALUES
(1, 1, 1, 'waiting', NULL),
(2, 2, 2, 'called', '2025-07-09 09:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) DEFAULT NULL
);

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'dokter'),
(3, 'pasien'),
(4, 'apoteker'),
(5, 'kasir'),
(6, 'pendaftaran');

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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `full_name`, `role_id`, `status`, `created_at`) VALUES
(1, 'admin1', 'hashed_admin_pw', 'Admin Rumah Sakit', 1, 'active', '2025-07-07 07:37:21'),
(2, 'drjoko', 'hashed_dokter_pw', 'Dr. Joko', 2, 'active', '2025-07-07 07:37:21'),
(3, 'drsinta', 'hashed_dokter_pw2', 'Dr. Sinta', 2, 'active', '2025-07-07 07:37:21'),
(4, 'budi123', 'hashed_pasien_pw', 'Budi Santoso', 3, 'active', '2025-07-07 07:37:21'),
(5, 'sari567', 'hashed_pasien_pw2', 'Sari Lestari', 3, 'active', '2025-07-07 07:37:21'),
(6, 'apotek1', 'hashed_apoteker_pw', 'Apoteker Andi', 4, 'active', '2025-07-07 07:37:21'),
(7, 'kasir1', 'hashed_kasir_pw', 'Kasir Rina', 5, 'active', '2025-07-07 07:37:21'),
(8, 'daftar1', 'hashed_pendaftaran_pw', 'Pendaftaran Wati', 6, 'active', '2025-07-07 07:37:21'),
(9, 'drjatmiko', 'hashed_dokter_pw', 'Dr. Jatmiko', 2, 'active', '2025-07-07 07:37:21');

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
  ADD UNIQUE KEY `username` (`username`);

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
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `exam_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `patient_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `prescription_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prescription_items`
--
ALTER TABLE `prescription_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `queue_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
-- Constraints for table `user_access_logs`
--
ALTER TABLE `user_access_logs`
  ADD CONSTRAINT `user_access_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
