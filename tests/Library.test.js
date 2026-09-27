import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import Library from '../src/components/Library/Library';
import libraryReducer from '../src/redux/slices/librarySlice';
import theme from '../src/styles/theme';

const songs = [
  {
    id: '1',
    title: 'Definitely Maybe',
    artist: 'Oasis',
    album: 'Definitely Maybe',
    duration: 'No disponible',
  },
];

function renderLibrary(preloadedLibrary = songs) {
  const store = configureStore({
    reducer: {
      library: libraryReducer,
    },
    preloadedState: {
      library: preloadedLibrary,
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Library />
      </ThemeProvider>
    </Provider>,
  );

  return store;
}

describe('Library', () => {
  test('muestra las canciones agregadas a la biblioteca', () => {
    renderLibrary();

    expect(
      screen.getByRole('heading', {
        name: 'Definitely Maybe',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Oasis/i)).toBeInTheDocument();
  });

  test('elimina una canción al hacer clic en Eliminar', () => {
    const store = renderLibrary();

    const button = screen.getByRole('button', {
      name: /eliminar/i,
    });

    fireEvent.click(button);

    expect(store.getState().library).toHaveLength(0);
  });

  test('muestra un mensaje cuando la biblioteca está vacía', () => {
    renderLibrary([]);

    expect(
      screen.getByText(/aún no has agregado canciones/i),
    ).toBeInTheDocument();
  });
});