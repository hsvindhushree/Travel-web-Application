/**
 * AI Service for Google Gemini Chatbot & Structured Itinerary Planner with Intelligent Fallback.
 */

// Helper to sanitize Gemini response text
function sanitizeText(text) {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

/**
 * Ask Gemini API conversational questions about a destination
 */
export async function askGeminiChatbot(destinationName, userQuestion, chatHistory = [], apiKey = "") {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";

  if (effectiveKey) {
    try {
      const systemInstruction = `You are Wanderlust AI, an expert, enthusiastic, and highly knowledgeable travel concierge. 
You are answering questions about ${destinationName}. Provide clear, friendly, structured, and actionable travel advice, local tips, hidden gems, and recommendations. Keep responses engaging and concise (under 250 words).`;

      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chatHistory.map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: `Question about ${destinationName}: ${userQuestion}` }] }
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Gemini API call failed, using intelligent travel engine:", e);
    }
  }

  // Smart Offline AI Fallback Engine
  return generateOfflineChatResponse(destinationName, userQuestion);
}

/**
 * Generate Day-by-Day Structured Itinerary
 */
export async function generateItinerary(destination, days = 3, style = "Balanced", apiKey = "") {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";

  if (effectiveKey) {
    try {
      const prompt = `Generate a detailed ${days}-day travel itinerary for ${destination.name}, ${destination.country}. Travel style: ${style}.
Return ONLY a raw JSON object (no markdown code blocks) matching this exact schema:
{
  "tripTitle": "${days}-Day ${style} Experience in ${destination.name}",
  "destination": "${destination.name}",
  "totalDays": ${days},
  "estimatedTotalBudget": "$500 - $1200",
  "bestSeason": "${destination.bestTimeToVisit}",
  "travelTip": "Essential tip for visiting ${destination.name}",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme of Day 1",
      "morning": {
        "title": "Morning Activity Title",
        "description": "Activity detail...",
        "location": "Famous Place Name",
        "estCost": "$20",
        "duration": "9:00 AM - 12:00 PM"
      },
      "afternoon": {
        "title": "Afternoon Activity Title",
        "description": "Activity detail...",
        "location": "Famous Place Name",
        "estCost": "$30",
        "duration": "1:00 PM - 5:00 PM"
      },
      "evening": {
        "title": "Evening Activity Title",
        "description": "Activity detail...",
        "location": "Famous Place Name",
        "estCost": "$45",
        "duration": "6:30 PM - 10:00 PM"
      },
      "insiderTip": "A secret tip for day 1"
    }
  ]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanJson = sanitizeText(rawText);
          const parsed = JSON.parse(cleanJson);
          if (parsed.days && parsed.days.length > 0) return parsed;
        }
      }
    } catch (e) {
      console.warn("Gemini API itinerary generation error, falling back to smart generator:", e);
    }
  }

  // Fallback Structured Day-by-Day Itinerary Engine
  return generateOfflineItinerary(destination, days, style);
}

/* Offline Chat response builder */
function generateOfflineChatResponse(destName, question) {
  const q = question.toLowerCase();
  
  if (q.includes("how long") || q.includes("days") || q.includes("duration")) {
    return `For ${destName}, we recommend spending **3 to 5 days** to comfortably explore the major historic sites, famous places, and enjoy local food without rushing.`;
  }
  if (q.includes("when to go") || q.includes("best time") || q.includes("weather") || q.includes("season")) {
    return `The optimal time to visit **${destName}** is during spring and autumn when weather conditions are mild, crowds are manageable, and outdoor sightseeing is most enjoyable.`;
  }
  if (q.includes("food") || q.includes("eat") || q.includes("restaurant") || q.includes("dish")) {
    return `When in **${destName}**, don't miss sampling local authentic street food, traditional dining specialties, and visiting neighborhood markets! Be sure to try local coffee houses and bistro specialties.`;
  }
  if (q.includes("budget") || q.includes("cost") || q.includes("expensive")) {
    return `A comfortable daily budget for **${destName}** ranges between **$100 to $250 per person/day**, covering boutique stays, local transport, entrance tickets, and authentic meals.`;
  }
  
  return `✨ **Wanderlust AI Guide for ${destName}**:\n\n${destName} offers incredible experiences! Be sure to explore top-rated landmarks in the morning to beat the queues, take mid-day cafe breaks, and reserve evening time for scenic view points or night market strolls. Ask me to plan your custom day-by-day itinerary!`;
}

/* Offline Itinerary generator builder */
function generateOfflineItinerary(dest, days, style) {
  const places = dest.famousPlaces || [];
  const place1 = places[0]?.name || "Historic City Center";
  const place2 = places[1]?.name || "Cultural Museum & Plaza";
  const place3 = places[2]?.name || "Panoramas & Local Market";
  const place4 = places[3]?.name || "Scenic River Walk & Dining";

  const generatedDays = [];

  for (let d = 1; d <= days; d++) {
    if (d === 1) {
      generatedDays.push({
        dayNumber: 1,
        theme: `Arrival & Iconic Landmarks of ${dest.name}`,
        morning: {
          title: `Discover ${place1}`,
          description: `Start your trip at ${place1}. Take photos, enjoy the early morning atmosphere, and learn about the local history.`,
          location: place1,
          estCost: places[0]?.cost || "$25",
          duration: "9:00 AM - 12:00 PM"
        },
        afternoon: {
          title: `Explore ${place2} & Local Lunch`,
          description: `Head over to ${place2} for art, architecture, and a delightful authentic regional lunch nearby.`,
          location: place2,
          estCost: "$35",
          duration: "1:30 PM - 5:00 PM"
        },
        evening: {
          title: "Sunset Promenade & Welcome Dinner",
          description: "Stroll along the historic central quarter and enjoy a candlelit welcome dinner with traditional specialties.",
          location: `${dest.name} Central Promenade`,
          estCost: "$45",
          duration: "6:30 PM - 9:30 PM"
        },
        insiderTip: "Buy skip-the-line tickets online in advance to save up to 45 minutes of queueing!"
      });
    } else if (d === 2) {
      generatedDays.push({
        dayNumber: 2,
        theme: `Art, Culture & Hidden Gems`,
        morning: {
          title: `Visit ${place3}`,
          description: `Take a scenic morning trip to ${place3} for magnificent panoramic views and photos.`,
          location: place3,
          estCost: places[2]?.cost || "Free",
          duration: "9:30 AM - 12:30 PM"
        },
        afternoon: {
          title: "Neighborhood Artisan Walking Tour",
          description: "Wander through bohemian cobblestone streets, artisan craft shops, and boutique cafes.",
          location: `${dest.name} Old Quarter`,
          estCost: "$20",
          duration: "2:00 PM - 5:30 PM"
        },
        evening: {
          title: `Night Lights at ${place4}`,
          description: `Experience ${place4} lit up under night lights, followed by tapas or wine tasting.`,
          location: place4,
          estCost: "$50",
          duration: "7:00 PM - 10:00 PM"
        },
        insiderTip: "Try visiting around 5:00 PM for the golden hour sunset light across the rooftops."
      });
    } else if (d === 3) {
      generatedDays.push({
        dayNumber: 3,
        theme: `Scenic Day Trip & Local Culinary Journey`,
        morning: {
          title: "Sunrise Viewpoint & Breakfast",
          description: "Enjoy breakfast at a top-rated panoramic terrace overlooking the city skyline.",
          location: `${dest.name} Lookout Point`,
          estCost: "$18",
          duration: "8:30 AM - 11:30 AM"
        },
        afternoon: {
          title: "Boats, Gardens & Park Relaxation",
          description: "Relax in lush botanical gardens or take a serene local river/coastal cruise.",
          location: `${dest.name} Park & Riverfront`,
          estCost: "$30",
          duration: "1:00 PM - 4:30 PM"
        },
        evening: {
          title: "Farewell Feast & Rooftop Drinks",
          description: "Celebrate your final night with chef's tasting menu and rooftop cocktails overlooking the cityscape.",
          location: `${dest.name} Sky Lounge`,
          estCost: "$65",
          duration: "7:00 PM - 10:30 PM"
        },
        insiderTip: "Ask locals for their favorite off-the-beaten-path dessert shop!"
      });
    } else {
      generatedDays.push({
        dayNumber: d,
        theme: `Deep Exploration & Leisure in ${dest.name}`,
        morning: {
          title: "Local Market & Cooking Workshop",
          description: "Immerse yourself in local flavors, purchasing fresh produce and learning authentic recipes.",
          location: `${dest.name} Central Market`,
          estCost: "$40",
          duration: "9:30 AM - 1:00 PM"
        },
        afternoon: {
          title: "Shopping & Gallery Hopping",
          description: "Explore contemporary art galleries and local craft boutiques.",
          location: `${dest.name} Shopping District`,
          estCost: "$30",
          duration: "2:30 PM - 6:00 PM"
        },
        evening: {
          title: "Live Music & Evening Celebration",
          description: "Experience local musical performances and lively night lounge atmosphere.",
          location: `${dest.name} Cultural Quarter`,
          estCost: "$45",
          duration: "7:30 PM - 11:00 PM"
        },
        insiderTip: "Use local transit cards for effortless city transport."
      });
    }
  }

  return {
    tripTitle: `${days}-Day ${style} Journey in ${dest.name}`,
    destination: dest.name,
    totalDays: days,
    estimatedTotalBudget: `$${days * 120} - $${days * 240}`,
    bestSeason: dest.bestTimeToVisit,
    travelTip: `Don't forget to pack comfortable walking shoes and keep a digital offline map downloaded for ${dest.name}!`,
    days: generatedDays
  };
}
