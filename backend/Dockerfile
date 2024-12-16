FROM python:3.11-slim

WORKDIR /app

# Gerekli sistem bağımlılıklarını yükleyin
RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev \
    gcc \
    netcat-traditional \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Python bağımlılıklarını yüklemek için requirements.txt'yi kopyalayın
COPY requirements.txt /app/requirements.txt

# Python bağımlılıklarını yükleyin
RUN pip install --no-cache-dir -r /app/requirements.txt

# Uygulama dosyalarını kopyalayın
COPY . /app/

# Veritabanı bağlantısını bekleyen bir başlangıç scripti ekleyin
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Uygulamanın çalışacağı portu açın
EXPOSE 8000

# Uygulamayı başlatın
CMD ["/wait-for-it.sh", "db:3306", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
