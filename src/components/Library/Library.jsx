import { useDispatch, useSelector } from 'react-redux';
import Song from '../Song/Song';
import { removeSong } from '../../redux/slices/librarySlice';
import { LibrarySection, RemoveButton } from './styles';

function Library() {
  const library = useSelector((state) => state.library);
  const dispatch = useDispatch();

  return (
    <LibrarySection>
      <h2>Mi biblioteca</h2>

      {library.length === 0 ? (
        <p>Aún no has agregado canciones.</p>
      ) : (
        library.map((song) => (
          <div key={song.id}>
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
            />

            <RemoveButton
              onClick={() => dispatch(removeSong(song.id))}
            >
              Eliminar
            </RemoveButton>
          </div>
        ))
      )}
    </LibrarySection>
  );
}

export default Library;