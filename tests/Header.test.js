import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import Header from '../src/components/Header/Header';
import theme from '../src/styles/theme';

describe('Header', () => {
  test('muestra el título de la aplicación', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', {
        name: /biblioteca musical/i,
      }),
    ).toBeInTheDocument();
  });

  test('muestra el subtítulo esperado', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    expect(
      screen.getByText(/mis canciones favoritas/i),
    ).toBeInTheDocument();
  });
});