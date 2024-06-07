<template>
  <q-page class="q-pa-md">
    <div v-if="isLoading" class="q-pa-md">
      <q-spinner size="50px" color="primary" />
    </div>
    <div v-if="error" class="q-pa-md text-negative">
      {{ error }}
    </div>
    <div v-if="!isLoading && !error && blogs.length > 0" class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="blog in blogs" :key="blog.id">
        <q-card>
          <q-img :src="blog.thumbnailUrl" />
          <q-card-section>
            <div class="text-h6">{{ blog.title }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBlogStore } from 'stores/blogStore';

const blogStore = useBlogStore();

const isLoading = ref(false);
const error = ref<string | null>(null);
const blogs = ref<Array<{ albumId: number, id: number, title: string, url: string, thumbnailUrl: string }>>([]);

onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await blogStore.fetchBlogs();
    blogs.value = blogStore.blogs;
  } catch (err) {
    error.value = 'Failed to load blogs';
    console.error('Error fetching blogs:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
</style>
