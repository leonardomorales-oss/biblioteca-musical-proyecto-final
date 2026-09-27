import { useState } from 'react';
import './styles.css';

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
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Busca un artista, por ejemplo Oasis"
      />

      <button type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;