import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSongs = createAsyncThunk(
  'search/fetchSongs',
  async (artist, { rejectWithValue }) => {
    try {
      const url = `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(artist)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }

      const data = await response.json();

      const results = (data.album || []).map((album) => ({
        id: album.idAlbum,
        title: album.strAlbum,
        artist: album.strArtist,
        album: album.strAlbum,
        duration: 'No disponible',
      }));

      return results;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Hubo un problema al cargar los datos',
      );
    }
  },
);

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'Hubo un problema al cargar los datos';
      });
  },
});

export const { resetResults } = searchSlice.actions;

export default searchSlice.reducer;