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
      <q-carousel-slide v-for="(chunk, index) in chunkedBlogs" :name="`slide-${index}`" :key="index">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="item in chunk" :key="item.id" class="bg-white shadow rounded-lg overflow-hidden">
            <img :src="item.thumbnailUrl" :alt="item.title" class="w-full h-48 object-cover">
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
import { useBlogsStore } from 'stores/blogs';
import { QCarousel, QCarouselSlide } from 'quasar';

export default defineComponent({
  components: {
    QCarousel,
    QCarouselSlide,
  },
  setup() {
    const blogsStore = useBlogsStore();
    const currentSlide = ref(0);

    onMounted(() => {
      blogsStore.fetchBlogs();
    });

    const chunkedBlogs = computed(() => {
      const chunkSize = 3;
      const blogs = blogsStore.allBlogs;
      const chunks = [];
      for (let i = 0; i < blogs.length; i += chunkSize) {
        chunks.push(blogs.slice(i, i + chunkSize));
      }
      return chunks;
    });

    return {
      currentSlide,
      blogs: blogsStore.allBlogs,
      loading: blogsStore.loading,
      error: blogsStore.error,
      chunkedBlogs,
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
