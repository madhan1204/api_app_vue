<template>
    <div class="p-6">
      <input
        v-model="title"
        @keyup.enter="fetchMovie"
        placeholder="Enter movie title"
        class="border p-2 mb-4 w-full"
      />
      <button @click="fetchMovie" >
        Search
      </button>
  
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
  
      <div v-if="movie" class="mt-4">
        <h2 class="text-2xl font-bold mb-2">{{ movie.Title }}</h2>
        <img :src="movie.Poster" :alt="movie.Title" class="w-64 mb-4" />
        <p><strong>Year:</strong> {{ movie.Year }}</p>
        <p><strong>Genre:</strong> {{ movie.Genre }}</p>
        <p><strong>Director:</strong> {{ movie.Director }}</p>
        <p><strong>Actors:</strong> {{ movie.Actors }}</p>
        <p><strong>Plot:</strong> {{ movie.Plot }}</p>
        <p><strong>Language:</strong> {{ movie.Language }}</p>
        <p><strong>Country:</strong> {{ movie.Country }}</p>
        <p><strong>Awards:</strong> {{ movie.Awards }}</p>
        <p><strong>IMDb Rating:</strong> {{ movie.imdbRating }}</p>
        <p><strong>Votes:</strong> {{ movie.imdbVotes }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useMovieStore } from 'stores/movie';
  
  export default defineComponent({
    setup() {
      const title = ref('');
      const movieStore = useMovieStore();
  
      const fetchMovie = () => {
        alert(JSON.stringify('Search button clicked'))
        if (title.value.trim()) {
          movieStore.fetchMovie(title.value.trim());
        }
      };
  
      return {
        title,
        fetchMovie,
        movie: movieStore.movie,
        loading: movieStore.loading,
        error: movieStore.error,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  