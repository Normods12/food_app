# 🍅 Tomato - Full Stack Food Delivery Application

A modern, full-stack food delivery web application designed to allow users to browse restaurant menus, manage a shopping cart, and submit delivery orders.

## 🚀 Technology Stack

### Frontend
- **Framework:** React.js powered by Vite
- **Styling:** Vanilla CSS / Bootstrap
- **State Management:** Context API
- **Routing:** React Router DOM
- **Deployment:** Hostinger (Static Site under a subdirectory `/food-del`)

### Backend
- **Framework:** Spring Boot (Java 17)
- **Database:** PostgreSQL (Production) / H2 (Local Development)
- **Security:** Spring Security with JWT Authentication
- **Object Mapping:** MapStruct & Lombok

### DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy / SSL:** Caddy (Automated TLS for `api.sitelive.in`)
- **CI/CD:** GitHub Actions
- **Hosting:** Azure Virtual Machine (Ubuntu/Linux)

---

## 🛠️ Local Development Setup

### 1. Backend Setup
1. Open the `Backend/Backend-Template` folder in your IDE (like IntelliJ IDEA).
2. The application is configured to run using an **in-memory H2 database** locally for easy testing. No local PostgreSQL installation is fully required.
3. Run the `FoodsApplication.java` main class.
4. The server will start on `http://localhost:8080`.

### 2. Frontend Setup
1. Open your terminal and navigate to the frontend folder:
   ```bash
   cd Frontend/Frontend-Template
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`. Any API calls to `/api` are automatically proxied to your local `8080` backend server by Vite.

---

## 🌍 Production Architecture & Deployment

The application utilizes a distributed architecture:
- The **Frontend** compilation is statically hosted on a shared hosting provider (Hostinger) at `https://sitelive.in/food-del/`.
- The **Backend API** and **Database** are hosted on a dedicated Azure Virtual Machine at IP `52.140.52.144` and accessed securely via `https://api.sitelive.in/api`.

### Docker Architecture
The Azure server runs three connected containers managed by `docker-compose.yml`:
1. **tomato-db:** A PostgreSQL container that stores all user, menu, and order data securely on a mounted volume.
2. **tomato-backend:** The Spring Boot application, injected dynamically with the PostgreSQL credentials.
3. **tomato-caddy:** A reverse proxy that listens on Port 80 and Port 443. It automatically fetches Let's Encrypt SSL certificates for the `api.sitelive.in` domain and safely funnels HTTPS traffic into the backend.

### Server Requirements
For the deployment to succeed and SSL to propagate, the Azure Virtual Machine **MUST** have the following inbound firewall rules open:
- **Port 80 (HTTP)**
- **Port 443 (HTTPS)**  *(Critical for Caddy to generate the secure certificates)*

---

## 🔄 CI/CD Pipeline (GitHub Actions)

This project features automated deployment. Every time code is pushed to the `main` branch, the `.github/workflows/deploy.yml` action triggers.

### The automated workflow does the following:
1. Checks out the latest repository code.
2. Connects to the Azure server using SSH.
3. Copies the latest project files (like `docker-compose.yml` and the `Dockerfile`) to `/home/gameon/Food_Del`.
4. Rebuilds the Java Backend Docker image *on the server itself*.
5. Restarts the Docker containers with zero downtime.

### Required GitHub Secrets
To make the pipeline work securely without exposing passwords, the following Repository Secrets MUST be configured in `Settings > Secrets and variables > Actions`:
* `SERVER_IP` (The public IP of the Azure Machine)
* `SERVER_USERNAME` (The SSH login name, e.g., *gameon*)
* `SERVER_PASSWORD` (The SSH password for the machine)

---

## 📁 Project Structure Highlights

- `.env.production` (Frontend): Tells the production React app explicitly where to find the Azure API.
- `vite.config.js` (Frontend): Configures the base URL so the app successfully works inside the `/food-del` Hostinger subdirectory.
- `.htaccess` (Hostinger configuration): Necessary to ensure React Router handles deep-linking without causing `404 Not Found` errors when users refresh the page.
