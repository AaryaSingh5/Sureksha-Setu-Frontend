# 🛡️ Suraksha Setu (सुरक्षा सेतु)
### *National Tourist Safety Command Centre with AI Anomaly Prediction & Live SOS GIS Tracking*

[![React Version](https://img.shields.io/badge/react-v19.0.0-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-v6.2.3-orange.svg)](https://vite.dev/)
[![TailwindCSS Version](https://img.shields.io/badge/tailwindcss-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-blue.svg)](https://www.typescriptlang.org/)

Suraksha Setu is a comprehensive National Tourist Safety Command Centre designed to provide proactive threat prediction, live geospatial emergency tracking, and rapid response coordination. Equipped with AI-driven anomaly detection, geofenced broadcast alerts, and official auditing tools, Suraksha Setu ensures the safety of domestic and international tourists across vulnerable sectors.

---

## 🚀 Key Modules & Features

### 1. 🧠 AI Anomaly Prediction Hub
* **Active Threat Zone Monitoring:** Leverages predictive analysis to pinpoint high-risk tourist clusters and environments.
* **Risk Heatmaps:** Generates interactive heatmaps displaying confidence scores, risk categories, and regional hazard assessments.
* **Model Logging:** Inspects automated anomaly detection logs from `Model Anomaly-v4.2` with up to 94.2% prediction confidence.

### 2. 🗺️ Live SOS GIS Tracking Map
* **Geospatial GIS Tracking:** View real-time GPS locations of registered tourists, emergency incidents, patrolling units, and nearby police stations.
* **Smart Unit Dispatch:** Assigns the closest patrolling units to active SOS tickets based on distance and availability.
* **Incident Lifecycle Management:** Direct resolution tracking to ensure tourists are confirmed safe before closing incident tickets.

### 3. 📱 Tourist Safety Portal
* **1-Tap Emergency Panic Button:** Direct signal beacon that broadcasts GPS coordinates and profile info straight to the Command Centre.
* **Self-Registration:** Allows tourists to register their profiles, emergency contacts, languages, and locations.
* **Multilingual Interface:** Fully localized in multiple languages including English (EN), Hindi (HI), and Spanish (ES).

### 4. 📢 Emergency Broadcast & Interception
* **Geofenced Emergency Alerts:** Officers can target specific regions (e.g., Kullu Sector) to push real-time hazard warnings (e.g., flash flood warnings) to active tourist devices.
* **Tourist Interception Modals:** Provides instructions and warnings for tourists crossing into critical anomaly zones.

### 5. 🔒 NIC Secure Gateway Audit Logging
* **Immutable Logs:** Automatically records and tracks all officer logins, tourist lookups, unit dispatches, and broadcast events.
* **Secure Badges:** Authenticates personnel utilizing badge numbers and multi-factor authentication (MFA).

---

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Component-driven UI development |
| **Build Tooling** | [Vite 6](https://vite.dev/) | Lightning-fast development server and asset bundling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type checking for reliable codebase maintenance |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) | Modern CSS utility framework for responsive layouts |
| **GIS / Mapping** | [Google Maps Platform](https://developers.google.com/maps) | Real-time map rendering and coordinate tracking |
| **AI Integration** | [@google/genai (Gemini)](https://ai.google.dev/) | Generative AI integration and model predictions |
| **Animations** | [Motion](https://motion.dev/) | Fluid micro-interactions and transitions |
| **Package Manager** | [Bun](https://bun.sh/) / [npm](https://www.npmjs.com/) | Fast package installation and dependency lockfiles |

---

## 📁 Repository Structure

```text
suraksha-setu/
├── src/
│   ├── components/            # Interactive UI modules (AI Hub, SOS Map, Tracking, etc.)
│   │   ├── ActualGoogleMap.tsx
│   │   ├── CrowdHeatmap.tsx
│   │   ├── Gateway.tsx
│   │   ├── Header.tsx
│   │   ├── InterceptionModal.tsx
│   │   ├── ModuleAIHub.tsx
│   │   ├── ModuleAnalyticsAudit.tsx
│   │   ├── ModuleBroadcast.tsx
│   │   ├── ModuleSOSMap.tsx
│   │   └── ModuleTouristTracking.tsx
│   ├── data/                  # Multilingual support and mock databases
│   │   ├── i18n.ts
│   │   └── mockData.ts
│   ├── types.ts               # Application TypeScript interfaces
│   ├── App.tsx                # Master state controller
│   ├── main.tsx               # Application mount entrypoint
│   └── index.css              # Global styles & Tailwind utilities
├── public/                    # Static assets & service workers (PWA compliance)
├── package.json               # Scripts, dependencies, and configuration
├── tsconfig.json              # TypeScript compilation rules
└── vite.config.ts             # Vite server and alias settings
```

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have **Node.js** (v18+) or **Bun** installed on your system.

### Installation & Run Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AaryaSingh5/Sureksha-Setu-Frontend.git
   cd Sureksha-Setu-Frontend
   ```

2. **Install dependencies:**
   *Using npm:*
   ```bash
   npm install
   ```
   *Using Bun:*
   ```bash
   bun install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add your Google Maps and Gemini API keys:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   GOOGLE_MAPS_PLATFORM_KEY="your_google_maps_key_here"
   ```

4. **Start the development server:**
   *Using npm:*
   ```bash
   npm run dev
   ```
   *Using Bun:*
   ```bash
   bun run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the Command Centre dashboard.
