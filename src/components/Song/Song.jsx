import { AddButton, SongContainer } from './styles';

function Song({
  title,
  artist,
  album,
  duration,
  onAdd,
  showAddButton = false,
  added = false,
}) {
  return (
    <SongContainer>
      <h3>{title}</h3>

      <p>
        <strong>Artista:</strong> {artist}
      </p>

      <p>
        <strong>Álbum:</strong> {album}
      </p>

      <p>
        <strong>Duración:</strong> {duration}
      </p>

      {showAddButton && (
        <AddButton onClick={onAdd} $added={added}>
          {added ? 'Agregada' : 'Agregar a mi biblioteca'}
        </AddButton>
      )}
    </SongContainer>
  );
}

export default Song;