--
-- Data for table `roles`
--
INSERT INTO roles (role_id, role_name) VALUES
(1, 'admin'),
(2, 'dokter'),
(3, 'pasien'),
(4, 'apoteker'),
(5, 'kasir'),
(6, 'pendaftaran');

--
-- Data for table `users`
--
INSERT INTO users (user_id, username, password_hash, full_name, role_id, status, created_at) VALUES
(1, 'admin1', 'password_hash_admin1', 'Administrator Utama', 1, 'active', '2025-01-01 10:00:00'),
(2, 'dr.andi', 'password_hash_drandi', 'Dr. Andi Pratama', 2, 'active', '2025-01-02 09:30:00'),
(3, 'dr.siti', 'password_hash_drsiti', 'Dr. Siti Nurjanah', 2, 'active', '2025-01-02 09:45:00'),
(4, 'pasien1', 'password_hash_pasien1', 'Budi Santoso', 3, 'active', '2025-01-03 11:00:00'),
(5, 'pasien2', 'password_hash_pasien2', 'Ani Lestari', 3, 'active', '2025-01-04 13:00:00'),
(6, 'apoteker1', 'password_hash_apoteker1', 'Fajar Ramadhan', 4, 'active', '2025-01-05 08:00:00'),
(7, 'kasir1', 'password_hash_kasir1', 'Dewi Anggraini', 5, 'active', '2025-01-06 09:00:00'),
(8, 'pendaftaran1', 'password_hash_pendaftaran1', 'Rina Fitriani', 6, 'active', '2025-01-07 10:00:00'),
(9, 'pasien3', 'password_hash_pasien3', 'Candra Wijaya', 3, 'active', '2025-01-08 12:00:00'),
(10, 'pasien4', 'password_hash_pasien4', 'Dina Amelia', 3, 'active', '2025-01-09 14:00:00');

--
-- Data for table `departments`
--
INSERT INTO departments (department_id, name, description) VALUES
(1, 'Poli Umum', 'Departemen untuk pemeriksaan kesehatan umum.'),
(2, 'Poli Gigi', 'Departemen khusus penanganan masalah gigi dan mulut.'),
(3, 'Poli Anak', 'Departemen khusus untuk kesehatan anak-anak.'),
(4, 'Poli Kandungan', 'Departemen khusus untuk kesehatan ibu dan kandungan.'),
(5, 'UGD', 'Unit Gawat Darurat.');

--
-- Data for table `doctors`
--
INSERT INTO doctors (doctor_id, user_id, department_id, specialization) VALUES
(1, 2, 1, 'Dokter Umum'),
(2, 3, 2, 'Dokter Gigi'),
-- (3, NULL, 3, 'Dokter Anak'), -- Contoh dokter tanpa user ID jika diperlukan
-- (4, NULL, 1, 'Dokter Keluarga'),
-- (5, NULL, 4, 'Dokter Kandungan');

--
-- Data for table `patients`
--
INSERT INTO patients (patient_id, user_id, nik, gender, birth_date, phone, address) VALUES
(1, 4, '3276011201900001', 'L', '1990-05-15', '081234567890', 'Jl. Mawar No. 10, Jakarta'),
(2, 5, '3276022306920002', 'P', '1992-11-20', '081298765432', 'Jl. Melati No. 25, Bogor'),
(3, 9, '3276030101880003', 'L', '1988-01-01', '081312345678', 'Jl. Anggrek No. 5, Depok'),
(4, 10, '3276040507950004', 'P', '1995-07-05', '081511223344', 'Jl. Dahlia No. 12, Bekasi'),
-- (5, NULL, '3276051012800005', 'P', '1980-12-10', '081700112233', 'Jl. Kenanga No. 30, Bandung'),
-- (6, NULL, '3276061103750006', 'L', '1975-03-11', '081899887766', 'Jl. Sakura No. 7, Tangerang');

--
-- Data for table `appointments`
--
INSERT INTO appointments (appointment_id, patient_id, schedule_date, department_id, doctor_id, status, created_at) VALUES
(1, 1, '2025-01-15', 1, 1, 'completed', '2025-01-10 09:00:00'),
(2, 2, '2025-01-16', 2, 2, 'completed', '2025-01-11 10:00:00'),
(3, 3, '2025-02-01', 1, 1, 'completed', '2025-01-25 11:00:00'),
(4, 4, '2025-02-02', 3, 3, 'completed', '2025-01-26 12:00:00'),
(5, 1, '2025-02-10', 1, 4, 'completed', '2025-02-05 13:00:00'),
(6, 5, '2025-03-01', 4, 5, 'completed', '2025-02-20 14:00:00'),
(7, 2, '2025-03-05', 2, 2, 'completed', '2025-02-28 09:00:00');

--
-- Data for table `queues`
--
INSERT INTO queues (queue_id, appointment_id, queue_number, status, call_time, created_at) VALUES
(1, 1, 101, 'done', '2025-01-15 09:15:00', '2025-01-15 09:00:00'),
(2, 2, 201, 'done', '2025-01-16 10:30:00', '2025-01-16 10:00:00'),
(3, 3, 102, 'done', '2025-02-01 11:30:00', '2025-02-01 11:00:00'),
(4, 4, 301, 'done', '2025-02-02 12:45:00', '2025-02-02 12:00:00'),
(5, 5, 103, 'done', '2025-02-10 13:30:00', '2025-02-10 13:00:00'),
(6, 6, 401, 'done', '2025-03-01 14:15:00', '2025-03-01 14:00:00');

--
-- Data for table `examinations`
--
INSERT INTO examinations (exam_id, appointment_id, doctor_id, complaint, diagnosis, notes, exam_date) VALUES
(1, 1, 1, 'Sakit kepala dan demam', 'Influenza', 'Istirahat cukup dan banyak minum air putih.', '2025-01-15 10:00:00'),
(2, 2, 2, 'Sakit gigi berlubang', 'Karies Gigi', 'Perlu penambalan segera.', '2025-01-16 11:00:00'),
(3, 3, 1, 'Batuk dan pilek', 'Bronkitis ringan', 'Resep obat batuk dan antibiotik.', '2025-02-01 12:00:00'),
(4, 4, 3, 'Demam pada anak', 'Campak', 'Isolasi dan berikan vitamin.', '2025-02-02 13:00:00'),
(5, 5, 4, 'Cek kesehatan rutin', 'Sehat', 'Pertahankan gaya hidup sehat.', '2025-02-10 14:00:00');

--
-- Data for table `medicines`
--
INSERT INTO medicines (medicine_id, name, stock, price) VALUES
(1, 'Paracetamol 500mg', 1000, 5000.00),
(2, 'Amoxicillin 500mg', 500, 15000.00),
(3, 'Vitamin C', 750, 7500.00),
(4, 'Obat Batuk Sirup', 300, 12000.00),
(5, 'Ibuprofen 400mg', 600, 8000.00);

--
-- Data for table `prescriptions`
--
INSERT INTO prescriptions (prescription_id, exam_id, created_at) VALUES
(1, 1, '2025-01-15 10:15:00'),
(2, 2, '2025-01-16 11:15:00'),
(3, 3, '2025-02-01 12:15:00'),
(4, 4, '2025-02-02 13:15:00');

--
-- Data for table `prescription_items`
--
INSERT INTO prescription_items (item_id, prescription_id, medicine_id, dosage, quantity, instructions) VALUES
(1, 1, 1, '3x sehari 1 tablet', 10, 'Diminum setelah makan.'),
(2, 2, 5, '2x sehari 1 tablet', 5, 'Jika nyeri.'),
(3, 3, 2, '3x sehari 1 tablet', 14, 'Habiskan antibiotik.'),
(4, 3, 4, '3x sehari 1 sendok teh', 1, 'Untuk batuk.'),
(5, 4, 3, '1x sehari 1 tablet', 7, 'Untuk meningkatkan daya tahan tubuh.'),
(6, 1, 3, '1x sehari 1 tablet', 7, 'Untuk daya tahan tubuh.');

--
-- Data for table `medicine_pickups`
--
INSERT INTO medicine_pickups (pickup_id, prescription_id, pickup_date, picked_by) VALUES
(1, 1, '2025-01-15 10:30:00', 6), -- picked_by user_id 6 (apoteker)
(2, 2, '2025-01-16 11:30:00', 6),
(3, 3, '2025-02-01 12:30:00', 6),
(4, 4, '2025-02-02 13:30:00', 6);

--
-- Data for table `payments`
--
INSERT INTO payments (payment_id, appointment_id, total_amount, payment_method, payment_status, payment_date) VALUES
(1, 1, 75000.00, 'cash', 'paid', '2025-01-15 10:45:00'),
(2, 2, 120000.00, 'card', 'paid', '2025-01-16 11:45:00'),
(3, 3, 90000.00, 'insurance', 'paid', '2025-02-01 12:45:00'),
(4, 4, 60000.00, 'cash', 'paid', '2025-02-02 13:45:00'),
(5, 5, 50000.00, 'card', 'paid', '2025-02-10 14:45:00');

--
-- Data for table `user_access_logs`
--
INSERT INTO user_access_logs (log_id, user_id, activity, log_time) VALUES
(1, 1, 'Login', '2025-01-01 10:01:00'),
(2, 2, 'Login', '2025-01-02 09:31:00'),
(3, 4, 'Melihat jadwal', '2025-01-03 11:05:00'),
(4, 6, 'Mengelola stok obat', '2025-01-05 08:30:00'),
(5, 7, 'Mencetak tagihan', '2025-01-06 09:10:00'),
(6, 8, 'Mendaftarkan pasien baru', '2025-01-07 10:15:00');