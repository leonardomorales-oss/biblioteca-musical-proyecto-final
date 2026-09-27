import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { BackLink, DetailContainer } from './styles';

function SongDetail() {
  const { id } = useParams();

  const url = `https://www.theaudiodb.com/api/v1/json/123/album.php?m=${id}`;

  const { data, loading, error, retry } = useFetch(url);

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Hubo un problema al cargar los detalles.</p>
        <button onClick={retry}>Reintentar</button>
      </div>
    );
  }

  const album = data?.album?.[0];

  if (!album) {
    return <p>No se encontró información para este álbum.</p>;
  }

  return (
    <DetailContainer>
      <h2>{album.strAlbum}</h2>

      <p><strong>Artista:</strong> {album.strArtist}</p>
      <p><strong>Álbum:</strong> {album.strAlbum}</p>
      <p><strong>Año:</strong> {album.intYearReleased || 'No disponible'}</p>

      <BackLink to="/">Volver a resultados</BackLink>
    </DetailContainer>
  );
}

export default SongDetail;