
INSERT INTO roles (role_id, role_name) VALUES
(1, 'pasien'),
(2, 'pendaftaran'),
(3, 'dokter'),
(4, 'kasir'),
(5, 'apoteker'),
(6, 'admin');


INSERT INTO departments (department_id, name, description) VALUES
(1, 'Poli Umum', 'Pelayanan pemeriksaan umum untuk semua usia'),
(2, 'Poli Gigi', 'Pelayanan kesehatan gigi dan mulut'),
(3, 'Poli Anak', 'Pelayanan kesehatan anak dan balita'),
(4, 'Poli Kandungan', 'Pelayanan kebidanan dan kandungan'),
(5, 'Poli Saraf', 'Pelayanan neurologi dan saraf');


INSERT INTO medicines (medicine_id, name, stock, price) VALUES
(1, 'Paracetamol 500mg', 200, 1500.00),
(2, 'Amoxicillin 500mg', 150, 2500.00),
(3, 'Salbutamol Tablet', 100, 1800.00),
(4, 'Antasida Doen', 120, 1300.00),
(5, 'Vitamin C 500mg', 300, 1000.00);


-- GANTI PASSWORD DENGAN HASH (password123): $2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO
INSERT INTO users (user_id, username, password_hash, full_name, role_id) VALUES
(1, 'pasien01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Ahmad Ridwan', 1),
(2, 'pendaftaran01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Siti Maesaroh', 2),
(3, 'dokter01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Dr. Budi Santoso', 3),
(4, 'kasir01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Dewi Kartika', 4),
(5, 'apoteker01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Agus Pranowo', 5),
(6, 'admin01', '$2b$10$Ubh4XBOyMmY6cfbMVIDM2.liJz.3DIluAlj9ZI6tJD47N4jLW9LKO', 'Lina Wahyuni', 6);

INSERT INTO patients (patient_id, user_id, nik, gender, birth_date, phone, address) VALUES
(1, 1, '3271012300010001', 'L', '1990-05-14', '081234567890', 'Jl. Merdeka No. 10, Bandung');

INSERT INTO doctors (doctor_id, user_id, department_id, specialization) VALUES
(1, 3, 1, 'Dokter Umum');

