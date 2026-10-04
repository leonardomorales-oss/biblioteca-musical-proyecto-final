import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import App from '../src/App';
import libraryReducer from '../src/redux/slices/librarySlice';
import searchReducer from '../src/redux/slices/searchSlice';
import audioDbApi from '../src/api/audioDbApi';
import theme from '../src/styles/theme';

jest.mock('../src/api/audioDbApi', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

function renderApp(initialEntries = ['/']) {
  const store = configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

  return store;
}

beforeEach(() => {
  audioDbApi.get.mockResolvedValue({
    data: {
      album: [
        {
          idAlbum: '2113118',
          strAlbum: 'Heathen Chemistry',
          strArtist: 'Oasis',
          intYearReleased: '2002',
        },
      ],
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App', () => {
  test('renderiza Header, navegación y SearchBar', () => {
    renderApp();

    expect(
      screen.getByRole('heading', {
        name: /biblioteca musical/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /inicio/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /mi biblioteca/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/busca un artista/i),
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
          name: 'Heathen Chemistry',
        }),
      ).toBeInTheDocument();
    });
  });

  test('agrega una canción a la biblioteca y navega a la página de biblioteca', async () => {
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

    fireEvent.click(
      screen.getByRole('link', {
        name: /mi biblioteca/i,
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: /mi biblioteca/i,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Heathen Chemistry',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /eliminar/i,
      }),
    ).toBeInTheDocument();
  });
});