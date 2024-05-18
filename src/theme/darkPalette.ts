const primary: DefaultPalette = {
  get main() {
    return this[900]
  },
  get light() {
    return this[800]
  },
  get contrastText() {
    return accent.main
  },
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#047857',
  900: '#047857',
}

const secondary: DefaultPalette = {
  get main() {
    return this[900]
  },
  get contrastText() {
    return accent.main
  },
  50: '#fdf2e1',
  100: '#fadeb4',
  200: '#FFF2E4',
  300: '#FFE5C9',
  400: '#FFD8AE',
  500: '#FFCB93',
  600: '#FFBD77',
  700: '#FFB05C',
  800: '#FFA341',
  900: '#FF9626',
}

const accent: DefaultPalette = {
  get main() {
    return this[900]
  },
  50: '#E3F6EE',
  100: '#BBE8D5',
  200: '#D6FFF1',
  300: '#ACFFE3',
  400: '#83FFD5',
  500: '#5AFFC8',
  600: '#30FFBA',
  700: '#07FFAC',
  800: '#00DC93',
  900: '#00B377',
}

const neutral: DefaultPalette = {
  get main() {
    return this[50]
  },
  50: '#0A0A0A',
  100: '#1C1B1B',
  200: '#424242',
  300: '#616161',
  400: '#757575',
  500: '#9E9E9E',
  600: '#C2C2C2',
  700: '#E0E0E0',
  800: '#EDEDED',
  900: '#F5F5F5',
  A100: '#FFFFFF',
  A200: '#343333',
}

const error: DefaultPalette = {
  get main() {
    return this[500]
  },
  get light() {
    return this[900]
  },
  get contrastText() {
    return accent.main
  },
  50: '#FCEAEC',
  100: '#FFE8E8',
  200: '#E39695',
  300: '#D46F6D',
  400: '#FA6959',
  500: '#F24937',
  600: '#CF3930',
  700: '#BD312A',
  800: '#B02A24',
  900: '#8C1F1F',
}

const warning: DefaultPalette = {
  get main() {
    return this[800]
  },
  get light() {
    return this[800]
  },
  get contrastText() {
    return accent.main
  },
  50: '#FCFCE6',
  100: '#FEFADC',
  200: '#F8F7C1',
  300: '#F4F198',
  400: '#F0EB6F',
  500: '#EDE74E',
  600: '#EAE22B',
  700: '#EBD125',
  800: '#F0DC28',
  900: '#BBAC25',
}

const info: DefaultPalette = {
  get main() {
    return this[900]
  },
  get light() {
    return this[50]
  },
  get contrastText() {
    return accent.main
  },
  50: '#EBEEFF',
  100: '#BCC5D3',
  200: '#929FB5',
  300: '#6A7B97',
  400: '#4B6083',
  500: '#2B4772',
  600: '#25406A',
  700: '#1D3760',
  800: '#172E53',
  900: '#0023DD',
}

const grey: DefaultPalette = {
  get main() {
    return this[900]
  },
  get contrastText() {
    return accent.main
  },
  50: '#fafafa',
  100: '#2C2C2C',
  200: '#F5F5F5',
  300: '#E2EBEF',
  400: '#E1E3E7',
  500: '#9e9e9e',
  600: '#757575',
  700: '#6F6D6D',
  800: '#424242',
  900: '#3C3B3B',
  A100: '#F3F2F2',
  A200: '#F5F5F5',
  A400: '#bdbdbd',
  A700: '#343333',
  A800: '#c4c4c4',
}

const palette: IPalette = {
  mode: 'dark',
  primary,
  secondary,
  accent,
  error,
  info,
  grey,
  neutral,
  warning,
  text: {
    primary: neutral[900],
    secondary: neutral[300],
  },
  common: {
    black: '#1C1B1B',
    white: '#FFFFFF',
  },
  background: {
    default: grey['100'],
    paper: neutral[100],
  },
}

export default palette
