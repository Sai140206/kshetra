# KSHETRA (क्षेत्र) — Unified Digital Agricultural Services Platform

> **Empowering Every Farmer with Affordable Tech, Group Strength & Zero Technical Barriers**

**KSHETRA (क्षेत्र)** is a full-featured, farmer-centric Web Application built with **React (Vite) + Tailwind CSS + Lucide Icons**. Tailored specifically for Indian agricultural dynamics, it features full dynamic multilingual support (**English, Marathi / मराठी, Hindi / हिंदी**) and browser speech synthesis read-aloud to accommodate farmers with low digital literacy.

---

## 🌟 Key Features

### 1. 🤝 Saha-Kisan (Community Transport & Equipment Pooling)
- **Problem**: Small & marginal farmers cannot afford individual transport to distant mandis or rent heavy equipment alone.
- **Solution**: Collaborative cargo space and harvester schedule pooling with live capacity visualization, pickup route milestones, and split freight calculation.

### 2. 📊 Smart Mandi Net-Profit Arbitrage Calculator
- **Problem**: Raw APMC prices don't account for fuel, tolls, mandi cess, and loading labor.
- **Solution**: Evaluates real take-home profit:
  $$\text{Net Profit} = (\text{Mandi Price} \times \text{Quantity}) - (\text{Distance} \times \text{Cost/km}) - \text{Loading Charges} - \text{Mandi Cess}$$
  Highlights the optimal mandi with a clear **"Best Deal"** badge and voice summary.

### 3. 🚨 Gram-Mechanic SOS Dispatch
- **Problem**: Machinery breakdowns during sowing/harvesting windows risk crop ruin.
- **Solution**: 1-tap emergency beacon broadcasting GPS plot coordinates to verified mobile mechanics within 10 km, complete with ETA and WhatsApp dispatch integration.

### 4. 🎙️ Vani-AI Voice Navigation
- **Problem**: Typing in sunlight or navigating complex UIs is a barrier for rural users.
- **Solution**: Voice-driven action bar using Web Speech API with regional phrase chips to automatically navigate, filter, and inspect services.

### 5. ⛅ Weather Advisory & Local Service Marketplace
- Hyperlocal crop advisories based on upcoming rain/pest alerts.
- Verified directory for tractors, drone sprayers, harvesters, cold storages, and local farm labor.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Internationalization**: React Context (`LanguageContext`) with English, Marathi, and Hindi
- **Accessibility**: Web Speech Synthesis API (`AudioReadButton`) & Speech Recognition

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Git](https://git-scm.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Sai140206/kshetra.git
   cd kshetra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
kshetra/
├── src/
│   ├── components/         # UI Components (Modals, Pooling, SOS, Mandi Arbitrage, etc.)
│   ├── context/            # LanguageContext & multilingual translations
│   ├── data/               # Seed data for mandis, listings, equipment & mechanics
│   ├── App.jsx             # Main application layout & view management
│   ├── index.css           # Tailwind CSS directives
│   └── main.jsx            # Application entrypoint
├── index.html              # HTML entry template
├── tailwind.config.js      # Tailwind design configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies & scripts
```

---

## 📄 License
This repository is private property of the project contributors.
