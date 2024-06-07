import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useBlogStore = defineStore('blogStore', () => {
  const blogs = ref([] as Array<{ albumId: number, id: number, title: string, url: string, thumbnailUrl: string }>);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchBlogs = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      blogs.value = response.data;
    } catch (err) {
      error.value = 'Failed to load blogs';
      console.error('Error fetching blogs:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    blogs,
    isLoading,
    error,
    fetchBlogs,
  };
});
