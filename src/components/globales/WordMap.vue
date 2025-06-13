<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="p-4 bg-white shadow-lg rounded-xl">
      <div id="map" class="overflow-hidden rounded-lg h-80"></div>
      <div class="mt-3 text-sm text-gray-600">
        <p>Coordinates: {{ currentPosition.lat }}, {{ currentPosition.lng }}</p>
        <p v-if="currentPosition.address" class="mt-1">Address: {{ currentPosition.address }}</p>
        <p class="mt-2 text-xs text-gray-500">Drag the marker to update location</p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
  
const props = defineProps({
  latitude: {
    type: Number,
    required: false,
    default: 3.766967 // Default to Paris latitude, 
  },
  longitude: {
    type: Number,
    required: false,
    default: 11.476593 // Default to Paris longitude
  },
  zoom: {
    type: Number,
    default: 13
  }
});
  
const emit = defineEmits(['update:position']);
  
const map = ref(null);
const currentMarker = ref(null);
const currentPosition = ref({
  lat: props.latitude,
  lng: props.longitude,
  address: ''
});
  
onMounted(() => {
  initMap();
});
  
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});
  
watch(() => [props.latitude, props.longitude], ([newLat, newLng]) => {
  if (map.value && newLat && newLng) {
    currentPosition.value.lat = newLat;
    currentPosition.value.lng = newLng;
    map.value.setView([newLat, newLng], props.zoom);
    updateMarker(newLat, newLng);
  }
}, { deep: true });
  
function initMap() {
  map.value = L.map('map').setView([props.latitude, props.longitude], props.zoom);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);
  
  map.value.on('click', handleMapClick);
    
  // Set initial marker with draggable option
  updateMarker(props.latitude, props.longitude);
  
  // Fetch initial address
  fetchLocationInfo(props.latitude, props.longitude);
}
  
function updateMarker(lat, lng) {
  if (currentMarker.value) {
    map.value.removeLayer(currentMarker.value);
  }
  
  // Create a draggable marker
  currentMarker.value = L.marker([lat, lng], {
    draggable: true
  }).addTo(map.value);
  
  // Add event listener for when marker drag ends
  currentMarker.value.on('dragend', handleMarkerDragEnd);
}
  
function handleMapClick(e) {
  const { lat, lng } = e.latlng;
  updateMarkerPosition(lat, lng);
}

function handleMarkerDragEnd(e) {
  const marker = e.target;
  const position = marker.getLatLng();
  updateMarkerPosition(position.lat, position.lng);
}

function updateMarkerPosition(lat, lng) {
  // Update marker position
  if (currentMarker.value) {
    currentMarker.value.setLatLng([lat, lng]);
  }
  
  // Update current position
  currentPosition.value.lat = parseFloat(lat.toFixed(6));
  currentPosition.value.lng = parseFloat(lng.toFixed(6));
  
  // Emit event with new position
  emit('update:position', {
    lat: currentPosition.value.lat,
    lng: currentPosition.value.lng
  });
  
  // Fetch location info
  fetchLocationInfo(lat, lng);
}
  
async function fetchLocationInfo(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    const data = await response.json();
  
    currentPosition.value.address = data.display_name || 'Unknown location';
  } catch (error) {
    console.error('Error fetching location data:', error);
    currentPosition.value.address = 'Unable to fetch location name';
  }
}
</script>
  
<style scoped>
/* Ensure the Leaflet CSS is properly loaded */
:deep(.leaflet-control-container .leaflet-top, 
.leaflet-control-container .leaflet-bottom) {
  z-index: 999;
}

:deep(.leaflet-container) {
  font-family: inherit;
}

.leaflet-pane{
  z-index: 1 !important;
}
</style>
