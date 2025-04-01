# AI-Enhanced Cybersecurity Threat Detector

## Overview
The **AI-Enhanced Cybersecurity Threat Detector** is a powerful tool designed to analyze **network traffic** and **system logs** using **transformer-based models** to detect and predict cybersecurity threats before they occur. This system leverages **machine learning**, **real-time analytics**, and **visualization dashboards** to provide security teams with **actionable insights** for threat mitigation.

---

## Features
- **AI-Powered Anomaly Detection**: Uses Transformer models for real-time cybersecurity threat identification.
- **Real-Time Network Traffic Monitoring**: Processes network logs to detect unusual behavior.
- **System Log Analysis**: Identifies potential insider threats, malware infections, and unauthorized access.
- **Live Alerts & Notifications**: Notifies security teams when high-risk anomalies are detected.
- **Interactive Dashboard**: Provides graphical representations of threats, network activity, and security alerts.
- **Incident Management System**: Allows tracking and resolution of reported security incidents.
- **User Authentication & Role-Based Access**: Restricts functionalities based on user roles (Admin, Security Analyst, Regular User).
- **Machine Learning Model Retraining**: Enables continuous model improvement with new data.

---

## Tech Stack
### **Backend**
- **Framework**: FastAPI / Flask (Python)
- **Database**: PostgreSQL + Redis (for caching alerts)
- **Machine Learning**: PyTorch / TensorFlow (Transformer models)
- **Event Streaming**: Kafka / RabbitMQ (Real-time logs processing)
- **Security**: JWT Authentication, OAuth

### **Frontend**
- **Framework**: React.js / Angular
- **State Management**: Redux / Zustand
- **UI Library**: Tailwind CSS / Material UI
- **Visualization**: Chart.js / D3.js / Grafana

---

## System Architecture
```
┌──────────────────────────────────────────────┐
│                Frontend                      │
│  - React.js / Angular                        │
│  - User Dashboard, Alerts, Analytics         │
└──────────────────────────────────────────────┘
             |       ▲
             ▼       |
┌──────────────────────────────────────────────┐
│                API Gateway                   │
│  - FastAPI / Flask                           │
│  - Handles API Requests                      │
└──────────────────────────────────────────────┘
             |       ▲
             ▼       |
┌──────────────────────────────────────────────┐
│                Machine Learning              │
│  - Transformer-based Anomaly Detection       │
│  - Risk Scoring & Prediction                 │
└──────────────────────────────────────────────┘
             |       ▲
             ▼       |
┌──────────────────────────────────────────────┐
│                Database                      │
│  - PostgreSQL (Logs, Users, Threats)         │
│  - Redis (Caching, Alerts)                   │
└──────────────────────────────────────────────┘
```

---

## Database Schema

### **Users Table**
| Field       | Type           | Description                    |
|------------|---------------|--------------------------------|
| id         | UUID          | Unique user ID                 |
| name       | VARCHAR(100)  | User's full name               |
| email      | VARCHAR(255)  | User email (unique)            |
| password   | VARCHAR(255)  | Hashed password                |
| role       | ENUM          | Role (Admin, Analyst, User)    |

### **Network Logs Table**
| Field       | Type           | Description                    |
|------------|---------------|--------------------------------|
| id         | UUID          | Unique log ID                  |
| timestamp  | TIMESTAMP     | Log entry time                 |
| source_ip  | VARCHAR(50)   | Source IP address              |
| dest_ip    | VARCHAR(50)   | Destination IP address         |
| protocol   | VARCHAR(20)   | Protocol used (TCP, UDP, etc.) |
| data       | TEXT          | Raw log data                   |

### **Threats Table**
| Field       | Type           | Description                    |
|------------|---------------|--------------------------------|
| id         | UUID          | Unique threat ID               |
| timestamp  | TIMESTAMP     | Time of detection              |
| threat_type| VARCHAR(100)  | Type of detected threat        |
| severity   | ENUM          | Risk level (Low, Medium, High) |
| status     | ENUM          | (Active, Resolved)             |
| user_id    | UUID (FK)     | Assigned security analyst      |

### **Incidents Table**
| Field       | Type           | Description                    |
|------------|---------------|--------------------------------|
| id         | UUID          | Unique incident ID             |
| timestamp  | TIMESTAMP     | Reported time                  |
| description| TEXT          | Incident details               |
| status     | ENUM          | (Open, In Progress, Resolved)  |
| user_id    | UUID (FK)     | Assigned analyst               |

---

## API Endpoints

### **User Authentication**
- `POST /auth/register` → Register new users
- `POST /auth/login` → Authenticate and receive JWT token
- `GET /users/{id}` → Get user profile

### **Threat Detection API**
- `POST /network_logs/ingest` → Upload network logs
- `POST /system_logs/ingest` → Upload system logs
- `GET /threats` → Retrieve all detected threats
- `GET /threats/{id}` → Get threat details

### **Incident Management**
- `POST /incidents` → Report a new cybersecurity incident
- `GET /incidents` → Retrieve all incidents
- `PUT /incidents/{id}` → Update incident status

### **Alerts & Notifications**
- `GET /alerts` → Fetch recent alerts
- `POST /alerts/resolve` → Mark an alert as resolved

---

## Installation Guide
### **Prerequisites**
- Python 3.9+
- Node.js 16+
- PostgreSQL
- Redis

### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/your-repo/cybersecurity-threat-detector.git
cd cybersecurity-threat-detector/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)

# Install dependencies
pip install -r requirements.txt

# Run the API Server
uvicorn app:main --reload
```

### **Frontend Setup**
```bash
cd ../frontend
npm install
npm start  # Runs on localhost:3000
```

---

## Roadmap
- [ ] Integrate SIEM Tools (e.g., Suricata, Elastic Stack)
- [ ] Implement AI-based Threat Intelligence Feeds
- [ ] Add Dark Web Monitoring for Leaked Credentials

---

## License
MIT License. See `LICENSE` file for details.

---

## Contact
For contributions, feature requests, or questions, reach out via [b3njaminbaya@gmail.com].

