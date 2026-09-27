import { useDispatch, useSelector } from 'react-redux';
import Song from '../Song/Song';
import { addSong } from '../../redux/libraryActions';
import { DetailLink, ResultItem, ResultsSection } from './styles';

function SearchResults({ songs }) {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);

  return (
    <ResultsSection>
      <h2>Resultados de búsqueda</h2>

      {songs.map((song) => {
        const added = library.some((item) => item.id === song.id);

        return (
          <ResultItem key={song.id}>
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              showAddButton={true}
              added={added}
              onAdd={() => dispatch(addSong(song))}
            />

            <DetailLink to={`/song/${song.id}`}>
              Ver detalles
            </DetailLink>
          </ResultItem>
        );
      })}
    </ResultsSection>
  );
}

export default SearchResults;