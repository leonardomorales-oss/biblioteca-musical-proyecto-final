import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import SearchBar from '../src/components/SearchBar/SearchBar';
import searchReducer from '../src/redux/slices/searchSlice';
import audioDbApi from '../src/api/audioDbApi';
import theme from '../src/styles/theme';

jest.mock('../src/api/audioDbApi', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

function renderSearchBar() {
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SearchBar />
      </ThemeProvider>
    </Provider>,
  );

  return store;
}

beforeEach(() => {
  audioDbApi.get.mockResolvedValue({
    data: {
      album: [],
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchBar', () => {
  test('renderiza correctamente el input de búsqueda', () => {
    renderSearchBar();

    expect(
      screen.getByPlaceholderText(/busca un artista/i),
    ).toBeInTheDocument();
  });

  test('permite escribir en el input', () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/busca un artista/i);

    fireEvent.change(input, {
      target: { value: 'Coldplay' },
    });

    expect(input).toHaveValue('Coldplay');
  });

  test('ejecuta la búsqueda al hacer clic en Buscar', async () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/busca un artista/i);
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, {
      target: { value: 'Oasis' },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(audioDbApi.get).toHaveBeenCalled();
    });
  });

  test('ejecuta la búsqueda al presionar Enter', async () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/busca un artista/i);

    fireEvent.change(input, {
      target: { value: 'Oasis' },
    });

    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(audioDbApi.get).toHaveBeenCalled();
    });
  });
});