<template>
  <div id="map_page" class="page-layout bg-start">
    <ButtonBack />
    
    <main class="frame">
      <QuestionBox
        title="🗺️ Taiwan Attraction Map"
        description="Explore all the must-see and must-eat spots across the island."
      />

      <div class="map-container-wrapper">
        <ClientOnly>
          <div ref="mapElement" class="map-instance"></div>
          
          <!-- Era Legend -->
          <div class="map-legend">
            <div v-for="(color, era) in eraColors" :key="era" class="legend-item">
              <span class="color-dot" :style="{ backgroundColor: color }"></span>
              <span class="legend-text">{{ era }}</span>
            </div>
          </div>
        </ClientOnly>
      </div>

      <section class="options">
        <OptionSingle
          text="› Back to Menu"
          @click="navigateTo('/menu')"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import { wishes } from '@/assets/data/data.js';

// Nuxt UseHead to manage Leaflet assets
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
      crossorigin: ''
    }
  ],
  script: [
    {
      src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
      crossorigin: '',
      tagPosition: 'bodyClose'
    }
  ]
})

// 🎯 Unified Data Source: Era, Year, Lat, Lng are now stored directly in data.js!

const eraColors = {
  "Indigenous": "#A855F7",
  "Discovery": "#3B82F6",
  "Qing": "#10B981",
  "Japanese": "#F59E0B",
  "Modern": "#EF4444"
};

const mapElement = ref<HTMLElement | null>(null);
let mapInstance: any = null;

const initMap = async () => {
  if (process.server) return;
  
  await nextTick();
  
  if (!mapElement.value) {
    console.error("Map element not found");
    return;
  }

  const L = (window as any).L;
  if (!L) {
    setTimeout(initMap, 500);
    return;
  }

  try {
    mapInstance = L.map(mapElement.value).setView([23.8, 121.0], 7);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(mapInstance);

    // Add Markers from wishes data
    wishes.forEach((item: any) => {
      // Accessing centralized fields from data.js
      if (item.Lat && item.Lng) {
        const color = eraColors[item.Era as keyof typeof eraColors] || "#ccc";
        
        const marker = L.circleMarker([item.Lat, item.Lng], {
          radius: 8,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapInstance);

        marker.bindPopup(`
          <div style="font-family: 'Inter', sans-serif; min-width: 120px;">
            <h4 style="margin: 0 0 5px 0; color: #333;">${item.Name_CH}</h4>
            <p style="margin: 0; font-size: 0.8rem; color: #666;">
              <strong>Era:</strong> ${item.Era}<br>
              <strong>Year:</strong> ${item.Year}
            </p>
          </div>
        `);
      }
    });

    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 200);

  } catch (err) {
    console.error("Error initializing map:", err);
  }
};

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove();
  }
});
</script>

<style scoped>
#map_page.page-layout {
  height: auto !important;
  min-height: 100vh;
  padding-bottom: 60px;
}

.map-container-wrapper {
  width: 100%;
  max-width: 1000px;
  background: white;
  border: 4px solid var(--dark_blue);
  box-shadow: 10px 10px 0px var(--dark_blue);
  margin: 20px 0;
  position: relative;
}

.map-instance {
  width: 100%;
  height: 600px;
  min-height: 400px;
  z-index: 1;
}

.map-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border: 2px solid var(--dark_blue);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #999;
}

.legend-text {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--dark_blue);
}

/* Fix popup styles to look better with the app theme */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0;
  border: 2px solid var(--dark_blue);
}
</style>
