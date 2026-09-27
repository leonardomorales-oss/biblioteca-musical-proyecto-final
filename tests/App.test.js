import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import App from '../src/App';
import libraryReducer from '../src/redux/slices/librarySlice';
import searchReducer from '../src/redux/slices/searchSlice';
import theme from '../src/styles/theme';

function renderApp() {
  const store = configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

  return store;
}

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          album: [
            {
              idAlbum: '1',
              strAlbum: 'Definitely Maybe',
              strArtist: 'Oasis',
            },
          ],
        }),
    }),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('App', () => {
  test('renderiza Header, SearchBar y Library', () => {
    renderApp();

    expect(
      screen.getByRole('heading', {
        name: /biblioteca musical/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/busca un artista/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /mi biblioteca/i,
      }),
    ).toBeInTheDocument();
  });

  test('realiza una búsqueda y muestra resultados', async () => {
    renderApp();

    const input = screen.getByPlaceholderText(/busca un artista/i);

    fireEvent.change(input, {
      target: { value: 'Oasis' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /buscar/i,
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Definitely Maybe',
        }),
      ).toBeInTheDocument();
    });
  });

  test('agrega una canción a la biblioteca', async () => {
    renderApp();

    const input = screen.getByPlaceholderText(/busca un artista/i);

    fireEvent.change(input, {
      target: { value: 'Oasis' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /buscar/i,
      }),
    );

    const addButton = await screen.findByRole('button', {
      name: /agregar a mi biblioteca/i,
    });

    fireEvent.click(addButton);

    expect(
      screen.getAllByRole('heading', {
        name: 'Definitely Maybe',
      }),
    ).toHaveLength(2);

    expect(
      screen.getByRole('button', {
        name: /eliminar/i,
      }),
    ).toBeInTheDocument();
  });
});