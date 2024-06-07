<template>
    <div>
      <q-carousel
        v-if="!loading && !error"
        v-model="currentSlide"
        arrows
        swipeable
        animated
        infinite
        navigation
        class="my-5"
      >
        <q-carousel-slide v-for="(chunk, index) in chunkedArtworks" :name="`slide-${index}`" :key="index">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in chunk" :key="item.id" class="bg-white shadow rounded-lg overflow-hidden">
              <img :src="item.thumbnail.lqip" :alt="item.thumbnail.alt_text" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, computed, ref } from 'vue';
  import { useArtworksStore } from 'stores/artworks';
  import { QCarousel, QCarouselSlide } from 'quasar';
  
  export default defineComponent({
    components: {
      QCarousel,
      QCarouselSlide,
    },
    setup() {
      const artworksStore = useArtworksStore();
      const currentSlide = ref(0);
  
      onMounted(() => {
        artworksStore.fetchArtworks();
      });
  
      const chunkedArtworks = computed(() => {
        const chunkSize = 3;
        const artworks = artworksStore.allArtworks;
        const chunks = [];
        for (let i = 0; i < artworks.length; i += chunkSize) {
          chunks.push(artworks.slice(i, i + chunkSize));
        }
        return chunks;
      });
  
      return {
        currentSlide,
        artworks: artworksStore.allArtworks,
        loading: artworksStore.loading,
        error: artworksStore.error,
        chunkedArtworks,
      };
    },
  });
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    gap: 1rem;
  }
  </style>
  