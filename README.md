# 🌍 Travel Web Application

A modern and responsive travel web application built with React that helps users explore destinations around the world, discover famous places, check real-time weather, get AI-powered travel assistance, and generate personalized itineraries.

## 🔗 Live Demo

https://travel-web-application-lemon.vercel.app

## 💻 GitHub Repository

https://github.com/hsvindhushree/Travel-web-Application

---

## 📌 Project Overview

The Travel Web Application is designed to provide users with an interactive platform for discovering and planning trips.

Users can:

- Explore destinations around the world
- Search and filter destinations
- View detailed destination information
- Discover famous places
- Get current weather information
- Detect or search for their location
- Ask travel-related questions using an AI chatbot
- Generate day-by-day travel itineraries
- Save favorite destinations and trips
- Use the application across desktop, tablet, and mobile devices

The application also provides fallback behavior for important features so that the core experience remains usable even when optional external API keys are not configured.

---

## ✨ Features

### 🌎 Destination Explorer

- Browse available travel destinations
- Search destinations
- Filter destinations
- View detailed information about individual destinations
- Explore attractions, activities, and destination information

### 🏛️ Famous Places

- Discover famous places and attractions
- View detailed information about places
- Display destination/place imagery
- Interactive presentation instead of simple text lists

### 📍 Location Awareness

- Request the user's current location
- Reverse geocode the detected location
- Search for locations manually
- Handle location permission denial gracefully

### 🌤️ Real-Time Weather

- Display current weather information
- Show temperature and weather conditions
- Support live weather data through external weather services
- Provide fallback weather information when required

### 🤖 AI Travel Assistant

- Ask travel-related questions
- Get destination recommendations
- Ask about activities, food, places, and travel planning
- Uses Gemini when an API key is available
- Includes a fallback response system

### 🗺️ Itinerary Planner

- Generate personalized travel itineraries
- Organize plans day-by-day
- Display activities in structured sections:
  - Morning
  - Afternoon
  - Evening
- Present the itinerary in a readable UI rather than raw AI output

### ❤️ Saved Trips & Favorites

- Save favorite destinations
- Save planned trips
- Access saved travel plans

### 📱 Responsive Design

- Desktop responsive layout
- Tablet responsive layout
- Mobile responsive layout
- Mobile-friendly navigation and interactions

### 🎨 UI & Animations

- Modern travel-focused interface
- Smooth animations
- Interactive components
- Hover and transition effects
- Framer Motion animations
- Responsive visual design

---

## 🛠️ Technologies Used

### Frontend

- React
- JavaScript
- HTML5
- CSS3

### Build Tool

- Vite

### Libraries

- Framer Motion
- Lucide React
- Canvas Confetti
- Tailwind CSS

### APIs & Services

- Open-Meteo
- OpenWeather
- Google Gemini
- Unsplash
- Browser Geolocation API

### Deployment

- Vercel

### Version Control

- Git
- GitHub

---

## 🔌 APIs & External Services

The application integrates with external services for dynamic functionality.

| Service | Purpose |
|---|---|
| Open-Meteo | Weather data and geocoding |
| OpenWeather | Weather data |
| Google Gemini | AI travel assistant and itinerary generation |
| Unsplash | Dynamic destination/place images |
| Browser Geolocation API | Detect user's current location |

### API Key Configuration

The application supports optional API keys through environment variables.

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=
VITE_GEMINI_API_KEY=
VITE_UNSPLASH_ACCESS_KEY=
