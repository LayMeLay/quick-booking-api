# Quick Booking API

Небольшой сервис для онлайн-бронирования слотов/дат с бэкендом на FastAPI и клиентским выбором дат через Zebra Datepicker. 

Проверяет пересечения диапазонов, валидирует входящие данные и отдает интерактивную Swagger-документацию из коробки.

## Стек

* Backend: Python 3.10+, FastAPI, Uvicorn, Pydantic
* База данных: SQLite / SQLAlchemy
* Frontend: HTML, CSS, JavaScript, Zebra Datepicker

## Что умеет

* Выбор диапазона дат через интерактивный календарь с блокировкой уже занятых дней.
* Проверка коллизий: исключает повторное бронирование одного и того же интервала.
* Валидация входных данных (корректность дат, контактов) через схемы Pydantic.
* Автогенерация документации эндпоинтов (Swagger UI и ReDoc).

## Структура проекта

```text
quick-booking-api/
├── backend/
│   ├── main.py               # Сервер FastAPI, роуты и валидация
│   └── requirements.txt      # Зависимости проекта
├── frontend/
│   ├── index.html            # Форма выбора дат
│   ├── js/                   # Скрипты и Zebra Datepicker
│   └── css/                  # Стили интерфейса
├── .gitignore
└── README.md
``` 

## Установка и запуск

### 1. Клонировать репозиторий:
```
git clone https://github.com/LayMeLay/quick-booking-api.git
cd quick-booking-api
```
### 2. Создать и активировать виртуальное окружение:
```
python -m venv .venv
```
# Windows (Git Bash):
```
source .venv/Scripts/activate
```
# Linux / macOS:
```
source .venv/bin/activate
```
### 3. Установить зависимости:
```
pip install -r requirements.txt
```
### 4. Запустить сервер разработки:
```
uvicorn main:app --reload
```
Сервис запустится по адресу: http://127.0.0.1:8000


## Документация API

После запуска сервера интерактивная документация доступна по адресам:
* Swagger UI: http://127.0.0.1:8000/docs
* ReDoc: http://127.0.0.1:8000/redoc

<div align="center">

$\color{#009688}\text{GL HF :3}$

<br/>
</div>
 
