# Kütüphane Yönetim Sistemi

Bu proje, web tabanlı bir kütüphane yönetim sistemidir. Admin kullanıcıları ve öğrenciler için farklı yetkiler sunar.

## Sistem Gereksinimleri

- Docker
- Docker Compose

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:
```bash
git clone <proje-url>
cd kutuphane-yonetim-sistemi
```

2. Docker Compose ile servisleri başlatın:
```bash
docker-compose up --build
```

3. Tarayıcıda aşağıdaki adreslere erişebilirsiniz:
- Ana Site: http://localhost
- API: http://localhost/api
- Admin Paneli: http://localhost/admin

## Kullanıcı Hesapları

### Admin Kullanıcısı
- Kullanıcı adı: admin
- Şifre: kütüphane2024!
- Yetkiler: Kitap ekleme, öğrenci kaydı, ödünç verme işlemleri onaylama

### Öğrenci Kullanıcısı
- Kullanıcı adı: student
- Şifre: student2024!
- Yetkiler: Kitap listeleme, ödünç kitap isteğinde bulunma

## API Endpoint'leri

### Kimlik Doğrulama
- POST /api/login/: Giriş yapma
- POST /api/logout/: Çıkış yapma

### Kitaplar
- GET /api/books/: Tüm kitapları listele
- GET /api/books/{id}/: Belirli bir kitabı getir
- POST /api/books/: Yeni kitap ekle (Yalnızca admin)
- PUT /api/books/{id}/: Kitap bilgilerini güncelle (Yalnızca admin)
- DELETE /api/books/{id}/: Kitabı sil (Yalnızca admin)

### Ödünç İşlemleri
- GET /api/lendings/: Tüm ödünç alma işlemlerini listele (Yalnızca admin)
- POST /api/lendings/: Yeni ödünç alma talebi oluştur
- GET /api/lendings/my/: Öğrencinin kendi ödünç kitapları
- PUT /api/lendings/{id}/approve/: Ödünç talebini onayla (Yalnızca admin)
- PUT /api/lendings/{id}/return/: Kitabı geri ver

### Öğrenciler
- GET /api/students/: Tüm öğrencileri listele (Yalnızca admin)
- POST /api/students/: Yeni öğrenci kaydı (Yalnızca admin)
- GET /api/students/{id}/: Öğrenci detayları (Yalnızca admin)

## Sorun Giderme

1. Veritabanı bağlantı hatası:
```bash
docker-compose down -v  # Tüm servisleri ve volumeleri kaldır
docker-compose up --build  # Servisleri yeniden başlat
```

2. Frontend bağlantı hatası:
```bash
docker-compose restart frontend  # Frontend servisini yeniden başlat
```

3. Backend API hatası:
```bash
docker-compose restart backend  # Backend servisini yeniden başlat
```

## Geliştirme

Projeyi geliştirmek için:

1. Frontend değişiklikleri için:
- src/ dizininde ilgili değişiklikleri yapın
- Değişiklikler otomatik olarak yansıyacaktır

2. Backend değişiklikleri için:
- backend/ dizininde ilgili değişiklikleri yapın
- `docker-compose restart backend` ile servisi yeniden başlatın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.