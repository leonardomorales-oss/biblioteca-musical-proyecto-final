import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SongDetail from '../src/components/SongDetail/SongDetail';
import theme from '../src/styles/theme';

function renderSongDetail() {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/song/123']}>
        <Routes>
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          album: [
            {
              idAlbum: '123',
              strAlbum: 'Definitely Maybe',
              strArtist: 'Oasis',
              intYearReleased: '1994',
            },
          ],
        }),
    }),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SongDetail', () => {
  test('muestra el estado de carga', () => {
    global.fetch = jest.fn(
      () => new Promise(() => {}),
    );

    renderSongDetail();

    expect(
      screen.getByText(/cargando detalles/i),
    ).toBeInTheDocument();
  });

  test('muestra los detalles del álbum', async () => {
    renderSongDetail();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Definitely Maybe',
        }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Oasis/i)).toBeInTheDocument();
    expect(screen.getByText(/1994/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error cuando falla la petición', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    renderSongDetail();

    await waitFor(() => {
      expect(
        screen.getByText(/hubo un problema al cargar los detalles/i),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole('button', {
        name: /reintentar/i,
      }),
    ).toBeInTheDocument();
  });

  test('muestra mensaje si no existe información del álbum', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            album: null,
          }),
      }),
    );

    renderSongDetail();

    await waitFor(() => {
      expect(
        screen.getByText(/no se encontró información para este álbum/i),
      ).toBeInTheDocument();
    });
  });
});