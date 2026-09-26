import Song from '../Song/Song';
import './styles.css';

function SearchResults({ songs, onAddSong }) {
  return (
    <section className="search-results">
      <h2>Resultados de búsqueda</h2>

      {songs.map((song) => (
        <Song
          key={song.id}
          title={song.title}
          artist={song.artist}
          album={song.album}
          duration={song.duration}
          showAddButton={true}
          onAdd={() => onAddSong(song)}
        />
      ))}
    </section>
  );
}

export default SearchResults;