import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import audioDbApi from '../../api/audioDbApi';

export const fetchSongs = createAsyncThunk(
  'search/fetchSongs',
  async (artist, { rejectWithValue }) => {
    try {
      const response = await audioDbApi.get('/searchalbum.php', {
        params: {
          s: artist,
        },
      });

      const results = (response.data.album || []).map((album) => ({
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