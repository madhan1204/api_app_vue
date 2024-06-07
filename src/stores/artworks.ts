import { defineStore } from 'pinia';
import axios from 'axios';

interface Artwork {
  id: number;
  title: string;
  thumbnail: {
    alt_text: string;
    width: number;
    height: number;
    lqip: string;
  };
  api_link: string;
}

interface ArtworksState {
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
}

export const useArtworksStore = defineStore('artworks', {
  state: (): ArtworksState => ({
    artworks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchArtworks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://api.artic.edu/api/v1/artworks/search?q=cats');
        this.artworks = response.data.data;
      } catch (error) {
        this.error = 'Failed to fetch artworks';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    allArtworks: (state) => state.artworks,
  },
});
