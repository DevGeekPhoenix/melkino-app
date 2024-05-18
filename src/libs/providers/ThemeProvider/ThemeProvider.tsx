import Head from 'next/head'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { ThemeProviderProps } from './ThemeProvider.types'
import { darkTheme, lightTheme } from '@/theme'
import { useDarkSelector } from '../StateManagerProvider/App.selectors'
import { GlobalCss } from '@/theme/globalCss'

const ThemeProvider = ({ children, emotionCache }: ThemeProviderProps) => {
  const isDark = useDarkSelector()

  const theme = isDark ? darkTheme : lightTheme

  return (
    <CacheProvider value={emotionCache as EmotionCache}>
      <MuiThemeProvider theme={{ ...theme }}>
        <CssBaseline />
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <GlobalStyles styles={GlobalCss(theme.palette as unknown as IPalette)} />

        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export default ThemeProvider
