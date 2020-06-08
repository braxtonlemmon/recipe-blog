import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from './src/components/layout';
import GlobalStyle from './src/theme/GlobalStyle';
import theme from './src/theme/theme';
import { ViewportProvider } from './src/components/ViewportProvider';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <ViewportProvider>
      <GlobalStyle />
      <Layout>{element}</Layout>
    </ViewportProvider>
  </ThemeProvider>
)