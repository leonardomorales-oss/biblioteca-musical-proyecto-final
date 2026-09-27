import Song from '../Song/Song';
import { LibrarySection } from './styles';

function Library({ songs }) {
  return (
    <LibrarySection>
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
    </LibrarySection>
  );
}

export default Library;