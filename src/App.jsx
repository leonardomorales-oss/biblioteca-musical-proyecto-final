import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import SongDetail from './components/SongDetail/SongDetail';

import useFetch from './hooks/useFetch';
import { AppContainer, Content } from './styles/AppStyles';

function App() {
  const [searchTerm, setSearchTerm] = useState('Oasis');

  const url = searchTerm
    ? `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(searchTerm)}`
    : null;

  const { data, loading, error, retry } = useFetch(url);

  const searchResults = useMemo(() => {
    if (!data?.album) {
      return [];
    }

    return data.album.map((album) => ({
      id: album.idAlbum,
      title: album.strAlbum,
      artist: album.strArtist,
      album: album.strAlbum,
      duration: 'No disponible',
    }));
  }, [data]);

  const handleSearch = (artist) => {
    setSearchTerm(artist);
  };

  return (
    <AppContainer>
      <Header />

      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />

                {loading && <p>Cargando...</p>}

                {error && (
                  <div>
                    <p>
                      Hubo un problema al cargar los datos. Intenta nuevamente.
                    </p>
                    <button onClick={retry}>
                      Reintentar
                    </button>
                  </div>
                )}

                {!loading && !error && (
                  <>
                    {searchResults.length > 0 ? (
                      <SearchResults songs={searchResults} />
                    ) : (
                      <p>No se encontraron resultados.</p>
                    )}

                    <Library />
                  </>
                )}
              </>
            }
          />

          <Route
            path="/song/:id"
            element={<SongDetail />}
          />
        </Routes>
      </Content>
    </AppContainer>
  );
}

export default App;