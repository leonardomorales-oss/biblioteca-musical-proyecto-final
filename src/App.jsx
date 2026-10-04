import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import SongDetail from './components/SongDetail/SongDetail';

import { fetchSongs } from './redux/slices/searchSlice';
import { AppContainer, Content } from './styles/AppStyles';

import LibraryPage from './pages/LibraryPage';
import Navigation from './components/Navigation/Navigation';

import FeaturedAlbums from './components/FeaturedAlbums/FeaturedAlbums';

function App() {
  const dispatch = useDispatch();

  const { results, loading, error } = useSelector(
    (state) => state.search,
  );

  const handleRetry = () => {
    dispatch(fetchSongs('Oasis'));
  };

  return (
    <AppContainer>
      <Header />
      <Navigation />

      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <SearchBar />

              <FeaturedAlbums />

              {loading && <p>Cargando...</p>}

              {error && (
                <div>
                  <p>
                    Hubo un problema al cargar los datos.
                    Intenta nuevamente.
                  </p>

                  <button onClick={handleRetry}>
                    Reintentar
                  </button>
                </div>
              )}

              {!loading && !error && (
                <>
                  {results.length > 0 ? (
                    <SearchResults />
                  ) : (
                    <p>Realiza una búsqueda para ver resultados.</p>
                  )}
                </>
              )}
            </>
            }
          />

          <Route
            path="/song/:id"
            element={<SongDetail />}
          />

          <Route
            path="/library"
            element={<LibraryPage />}
          />
        </Routes>


      </Content>
    </AppContainer>
  );
}

export default App;