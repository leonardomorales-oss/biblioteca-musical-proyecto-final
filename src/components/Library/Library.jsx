import Song from '../Song/Song';
import './styles.css';

function Library({ songs }) {
  return (
    <section className="library">
      <h2>Mi biblioteca</h2>

      {songs.length === 0 ? (
        <p>Aún no has agregado canciones.</p>
      ) : (
        songs.map((song) => (
          <Song
            key={song.id}
            title={song.title}
            artist={song.artist}
            album={song.album}
            duration={song.duration}
          />
        ))
      )}
    </section>
  );
}

export default Library;