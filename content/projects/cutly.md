---
title: "Self-hosted URL Shortner"
summary: Read and understand how to self host a url shortner.
date: 2025-09-05
series: ["System Design"]
weight: 1
aliases: ["/setup"]
tags: ["System Design", "Redis", "PostgreSQL", "NGINX"]
author: ["Shivansh Tyagi"]
cover:
  image: images/papermod-cover.png
  hiddenInList: true
# social:
#   fediverse_creator: "@adityatelange@mastodon.social"
---
# 🔗 Cutly

A lightweight URL shortener built with **Flask**, **PostgreSQL**, and **Redis**, containerized with **Docker** and orchestrated using **docker-compose**.

---

## 🚀 Features
- Shorten long URLs into unique short links  
- Redirect short links to original URLs  
- Persistent storage with **PostgreSQL**  
- Caching with **Redis**  
- Secure password hashing using **bcrypt**  
- User authentication with **Flask-Login**  
- Production-ready serving with **Gunicorn**

---

## 📦 Tech Stack
- **Backend**: Flask + Gunicorn  
- **Database**: PostgreSQL  
- **Cache / Queue**: Redis  
- **Containerization**: Docker + docker-compose  

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ShivanshTyagi9/Cutly.git
cd Cutly
```

For Kubernetes deployment instructions, check the [Kubernetes Setup Guide](kubernetes_setup_for_cutly.md).


### 2. Environment Configuration (Running via container):
Create a `.env` file in the root directory:

```ini
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

REDIS_HOST=
REDIS_PORT=
REDIS_PORT_INTERNAL=

WEB_PORT=
SESSION_SECRET=
```

Configure docker-compose file as needed:

```ini
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports: ["${POSTGRES_PORT}:5432"]

  redis:
    image: redis:7
    command: ["--appendonly","yes"]
    ports: ["${REDIS_PORT}:6379"]

  web:
    image: <Docker Hub username>/cutly:v1
    build: .
    ports: ["${WEB_PORT}:5000"]
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      REDIS_HOST: ${REDIS_HOST}
      REDIS_PORT: ${REDIS_PORT_INTERNAL}
      SESSION_SECRET: ${SESSION_SECRET}
    depends_on: [postgres, redis]
```

### 3. Build & Start Services

#### Build Docker Image:
```bash
docker build -t <Docker Hub username>/cutly:v1
```
#### Start Services:
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

This will start:
- 🌐 **Flask app** (served by Gunicorn) on `http://localhost:5000`
- 🗄️ **PostgreSQL database** on port `5432`
- 🚀 **Redis cache** on port `6379`

### 4. Verify Installation

Visit `http://localhost:5000` in your browser to access the URL shortener interface.


---

## 📂 Project Structure

```
url-shortener/
├── app/                    # Flask application code
│   ├── __init__.py        # App factory and configuration
│   ├── models.py          # Database models
│   ├── routes.py          # URL routes and views
│   └── utils.py           # Utility functions
├── templates/              # Jinja2 templates
├── static/                 # CSS, JS, images
├── Dockerfile             # Container image definition
├── docker-compose.yml     # Multi-service orchestration
├── requirements.txt       # Python dependencies
├── setup.sh              # Database initialization script
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

---