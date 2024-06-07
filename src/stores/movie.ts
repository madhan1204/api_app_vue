import { defineStore } from 'pinia';
import axios from 'axios';

interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface MovieState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const API_KEY = '30626d55';

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    movie: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMovie(title: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
        if (response.data.Response === 'True') {
          this.movie = response.data;
        } else {
          this.error = response.data.Error;
          this.movie = null;
        }
      } catch (error) {
        this.error = 'Failed to fetch movie';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    allMovie: (state) => state.movie,
  },
});
