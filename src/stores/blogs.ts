// src/stores/blogs.ts
import { defineStore } from 'pinia';
import axios from 'axios';

interface Blog {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface BlogsState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

export const useBlogsStore = defineStore('blogs', {
  state: (): BlogsState => ({
    blogs: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBlogs() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        this.blogs = response.data;
      } catch (error) {
        this.error = 'Failed to fetch blogs';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    allBlogs: (state) => state.blogs,
  },
});
