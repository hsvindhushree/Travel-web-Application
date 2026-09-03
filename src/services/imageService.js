/**
 * Dynamic Image Service supporting Unsplash Search API with high quality curated fallbacks.
 */

const IMAGE_CACHE = new Map();

export async function fetchPlaceImages(query, apiKey = "", count = 4) {
  const cacheKey = `${query}_${count}`;
  if (IMAGE_CACHE.has(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  }

  if (apiKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " travel landmark")}&per_page=${count}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${apiKey}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const images = data.results.map(img => img.urls.regular);
          IMAGE_CACHE.set(cacheKey, images);
          return images;
        }
      }
    } catch (e) {
      console.warn("Unsplash API error, using curated dynamic imagery:", e);
    }
  }

  // Curated Unsplash CDN Source Fallback based on query keywords
  const lower = query.toLowerCase();
  let baseImages = [];

  if (lower.includes("paris") || lower.includes("eiffel") || lower.includes("louvre")) {
    baseImages = [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1200&q=80"
    ];
  } else if (lower.includes("tokyo") || lower.includes("japan") || lower.includes("shibuya")) {
    baseImages = [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80"
    ];
  } else if (lower.includes("bali") || lower.includes("indonesia") || lower.includes("beach")) {
    baseImages = [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
    ];
  } else {
    // General high-quality scenic landscape placeholders from Unsplash
    baseImages = [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ];
  }

  IMAGE_CACHE.set(cacheKey, baseImages);
  return baseImages;
}
