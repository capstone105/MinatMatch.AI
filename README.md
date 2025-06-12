# MinatMatch.AI 🚀  
**AI-Powered Career Recommendation Progressive Web App**

[![Project Status](https://img.shields.io/badge/status-complete-brightgreen)](https://minat-match-ai.vercel.app)  
[![Live Demo](https://img.shields.io/badge/demo-online-blue)](https://minat-match-ai.vercel.app)  
[![PWA Ready](https://img.shields.io/badge/PWA-optimized-blue)](https://web.dev/progressive-web-apps/)  
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) 

## 🌟 Overview
MinatMatch.AI is an artificial intelligence-based Progressive Web App (PWA) developed to help users discover optimal career paths through comprehensive analysis of their interests and background.

## ✨ Core Features

### 🎯 Career Recommendations
- AI-powered career matching with probability scores
- Analyzes:
  - Academic performance (GPA 2.0–4.0)
  - Project experience
  - Interest levels (Data Science, Database, Programming)
- Clear top 3 career suggestions

### 👤 User Management
- Secure authentication system
- Profile customization with photo upload
- Password change functionality
- Account management

### 📊 Career History
- Track all past recommendations
- Delete individual or all history items

### ♿ Accessibility
- Keyboard navigation
- Screen reader optimized
- ARIA landmarks and roles

### 📱 PWA Features
- Offline capabilities
- Installable on devices
- Fast loading with service workers
- App-like experience

## 🛠 Technical Implementation

### MVP Architecture
- **Model**: Handles data and business logic
- **View**: UI components (pages)
- **Presenter**: Mediates between Model and View

### Frontend Stack
- **Core**: JavaScript ES6+, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Build**: Webpack
- **UI**: Font Awesome, SweetAlert2
- **PWA**: Workbox service workers

## 🚀 Installation & Usage

### Prerequisites
- Node.js v16+
- npm 8+

### 1. Clone Repository
```bash
git clone https://github.com/capstone105/MinatMatch.AI.git
cd MinatMatch.AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run start-dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build (Optional)
```bash
npm run serve
```

**Script Descriptions:**
- `npm run start-dev`: Start the development server with hot reload
- `npm run build`: Build the app for production (output in `dist/`)
- `npm run serve`: Serve the production build locally using http-server
