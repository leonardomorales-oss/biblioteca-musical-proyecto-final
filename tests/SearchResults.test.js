import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import SearchResults from '../src/components/SearchResults/SearchResults';
import libraryReducer from '../src/redux/slices/librarySlice';
import searchReducer from '../src/redux/slices/searchSlice';
import theme from '../src/styles/theme';

const songs = [
  {
    id: '1',
    title: 'Definitely Maybe',
    artist: 'Oasis',
    album: 'Definitely Maybe',
    duration: 'No disponible',
  },
  {
    id: '2',
    title: 'Morning Glory',
    artist: 'Oasis',
    album: 'Morning Glory',
    duration: 'No disponible',
  },
];

function renderSearchResults() {
  const store = configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
    preloadedState: {
      library: [],
      search: {
        results: songs,
        loading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

  return store;
}

describe('SearchResults', () => {
  test('renderiza correctamente las canciones', () => {
  renderSearchResults();

  expect(
    screen.getByRole('heading', {
      name: 'Definitely Maybe',
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: 'Morning Glory',
    }),
  ).toBeInTheDocument();
});

  test('muestra artista y álbum de las canciones', () => {
    renderSearchResults();

    expect(
      screen.getAllByText(/Oasis/i).length,
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText(/Definitely Maybe/i).length,
    ).toBeGreaterThan(0);
  });

  test('agrega una canción a la biblioteca', () => {
    const store = renderSearchResults();

    const buttons = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    });

    fireEvent.click(buttons[0]);

    const state = store.getState();

    expect(state.library).toHaveLength(1);
    expect(state.library[0].title).toBe('Definitely Maybe');
  });

  test('no agrega la misma canción dos veces', () => {
    const store = renderSearchResults();

    const button = screen.getAllByRole('button', {
      name: /agregar a mi biblioteca/i,
    })[0];

    fireEvent.click(button);
    fireEvent.click(button);

    expect(store.getState().library).toHaveLength(1);
  });
});