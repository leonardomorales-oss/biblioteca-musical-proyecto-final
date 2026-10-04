import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSongs } from '../../redux/slices/searchSlice';
import { SearchButton, SearchForm, SearchInput } from './styles';

function SearchBar() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.search.loading);

  const handleSubmit = (event) => {
    event.preventDefault();

    const artist = value.trim();

    if (artist) {
      dispatch(fetchSongs(artist));
    }
  };

  return (
    <SearchForm
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscador de artistas"
    >
      <label htmlFor="artist-search">
        Buscar artista
      </label>

      <SearchInput
        id="artist-search"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Busca un artista, por ejemplo Oasis"
        aria-label="Nombre del artista"
      />

      <SearchButton
        type="submit"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </SearchButton>
    </SearchForm>
  );
}

export default SearchBar;