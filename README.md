# MoodTracker Frontend

A modern, premium React application for tracking daily moods. This frontend features a "Wow-factor" design with dark mode aesthetics, secure authentication, and full bilingual support (English/Vietnamese).

## ✨ Features
- **Premium UI:** Powered by Lucide React and custom CSS for a sleek, responsive experience.
- **Secure Auth:** Integrated login and registration system with JWT session management.
- **Mood Tracking:** Beautiful icon-based mood selector with history view and timestamps.
- **Bilingual:** Real-time language switching between English and Vietnamese.
- **Refactored Architecture:** Clean, modular folder structure (Feature-sliced design principles).

## 🛠 Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **icons:** Lucide React
- **HTTP Client:** Axios
- **Hosting:** Docker (Optimized for static serving)

## 📂 Project Structure
Organized for scalability and clarity:
- `src/features/`: Feature-sliced logic (Auth, Moods, i18n/Translations).
- `src/hooks/`: Custom hooks for accessing Auth and Language state (`useAuth`, `useLanguage`).
- `src/components/`: Shared UI components and layout wrappers (Header, etc.).
- `src/assets/`: Global styles and static assets.
- `src/pages/`: Main application views (HomePage, etc.).
- `src/config/`: Centralized API configuration and constants.

## 🏁 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file pointing to your backend API:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` is correctly set.

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## ⚓ Deployment (Kubernetes)
Manifests are located in the `k8s/` folder:
- `web-deployment.yaml`: Optimized deployment for the static frontend.
- `web-service.yaml`: Internal service exposure.

The application is served via a lightweight container and ideally routed through the Backend's Ingress for professional SSL/HTTPS termination.

---
Part of the **MindX Engineer Onboarding** program.
