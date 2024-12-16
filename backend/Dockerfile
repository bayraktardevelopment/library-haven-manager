FROM python:3.9

WORKDIR /app

RUN apt-get update && apt-get install -y default-mysql-client

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8000

CMD ["/wait-for-it.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000"]