import { Link } from 'react-router-dom';
import Song from '../Song/Song';
import './styles.css';

function SearchResults({ songs, onAddSong }) {
  return (
    <section className="search-results">
      <h2>Resultados de búsqueda</h2>

      {songs.map((song) => (
        <div key={song.id} className="search-result-item">
          <Song
            title={song.title}
            artist={song.artist}
            album={song.album}
            duration={song.duration}
            showAddButton={true}
            onAdd={() => onAddSong(song)}
          />

          <Link to={`/song/${song.id}`} className="detail-link">
            Ver detalles
          </Link>
        </div>
      ))}
    </section>
  );
}

export default SearchResults;