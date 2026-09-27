import { useState } from 'react';
import { SearchButton, SearchForm, SearchInput } from './styles';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const artist = value.trim();

    if (artist) {
      onSearch(artist);
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Busca un artista, por ejemplo Oasis"
      />

      <SearchButton type="submit">Buscar</SearchButton>
    </SearchForm>
  );
}

export default SearchBar;