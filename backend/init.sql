-- Admin kullanıcısı oluştur
INSERT INTO auth_user (username, email, password, is_staff, is_active, is_superuser, first_name, last_name, date_joined)
VALUES ('admin', 'admin@example.com', 'pbkdf2_sha256$600000$kütüphane2024!', 1, 1, 1, 'Admin', 'User', NOW());

-- Öğrenci kullanıcısı oluştur
INSERT INTO auth_user (username, email, password, is_staff, is_active, is_superuser, first_name, last_name, date_joined)
VALUES ('student', 'student@example.com', 'pbkdf2_sha256$600000$student2024!', 0, 1, 0, 'Student', 'User', NOW());

-- Öğrenci profilini oluştur
INSERT INTO library_app_student (user_id, student_number, created_at)
SELECT id, 'STD001', NOW()
FROM auth_user
WHERE username = 'student';