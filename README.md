# ✈️ Wanderlust — Next-Gen AI Travel Explorer & Day-by-Day Itinerary Planner

A design-forward, highly interactive travel web application built for the **designesthetics Front-End Developer Assignment**.

---

## 🌟 Key Features & Requirements Matrix

| Requirement                  | Implementation Details                                                                                                                                                                                                         |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. Landing Experience**   | Ambient looping hero background video with cinematic dark glass contrast, live location weather pill, quick stats, and search bar.                                                                                             |
| **02. Destination Explorer** | Interactive grid of 12+ curated global destinations. Search bar, continent & category filter tabs (_All, City, Beach, Cultural, Historic, Nature_), price level indicator, and sorting by rating / budget.                     |
| **03. Famous Places**        | Notable sights presented with high-resolution photography, recommended visit duration, ticket cost, star ratings, and key highlight bullet points.                                                                             |
| **04. Location Awareness**   | Browser Geolocation API integration ("Use My Device Location") + Open-Meteo live geocoding city search and popular global hubs shortcut pills.                                                                                 |
| **05. Real-Time Weather**    | Live real-time temperature, condition, humidity %, wind speed (km/h), and 5-day outlook using **Open-Meteo API** (zero-config fallback) or **OpenWeather API** (if key provided). Celsius / Fahrenheit metric toggle included. |
| **06. Dynamic Imagery**      | Dynamically loads high-res landscape photos via **Unsplash API** with curated high-definition CDN fallbacks.                                                                                                                   |
| **07. AI Chatbot**           | **Google Gemini 2.5 Flash API** conversational travel assistant (`VITE_GEMINI_API_KEY` supported, plus built-in smart travel engine fallback). Preset prompt shortcut pills for fast Q&A.                                      |
| **08. Itinerary Planning**   | Bespoke trip builder generating structured **Day-by-Day visual timelines** (Morning, Afternoon, Evening cards, estimated costs, secret local tips, confetti celebration, and PDF/Print export).                                |

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism design system + Custom keyframe animations
- **Icons**: Lucide Icons (`lucide-react`)
- **Animations & Effects**: Framer Motion & `canvas-confetti`
- **APIs**:
  - Weather: Open-Meteo Live API & OpenWeatherMap API
  - Geocoding: Open-Meteo Geocoding & HTML5 Geolocation API
  - AI Assistant: Google Gemini API (gemini-2.5-flash)
  - Images: Unsplash REST API

---

## 🚀 Getting Started & Local Setup

### 1. Clone & Install Dependencies

```bash
cd travel-app
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env` file in the root directory (or use the in-app **⚙️ Settings Gear** modal):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_key_here
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

> **Note**: The application works **100% out-of-the-box** without any mandatory API keys!

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🎨 Design Philosophy

- **Visual Excellence**: Built with a sleek dark slate theme (`#020617`), vibrant cyan & emerald neon accents, backdrop blur glassmorphism, and responsive grid layouts.
- **Error & Edge State Handling**: Graceful loading skeletons, zero-result search feedback, location permission error handling, and API fallback indicators.
- **Accessibility & Responsiveness**: Fully responsive across Mobile, Tablet, and Desktop displays.

---

_Designed & Developed for designesthetics Assignment._
