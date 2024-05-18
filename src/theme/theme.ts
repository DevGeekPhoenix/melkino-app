import { createTheme, ThemeOptions } from '@mui/material/styles'
import breakpoints from './breakpoints'
import components from './components'
import lightPalette from './lightPalette'
import darkPalette from './darkPalette'
import shadows from './shadows'
import transitions from './transitions'
import typography from './typography'

const options = {
  shadows,
  typography,
  spacing: 4,
  transitions,
  breakpoints,
  components: components,
  shape: { borderRadius: 4 },
}

export const darkTheme = createTheme({
  ...options,
  palette: darkPalette,
  darkMode: true,
} as ThemeOptions)

export const lightTheme = createTheme({
  ...options,
  palette: lightPalette,
  darkMode: false,
} as ThemeOptions)
