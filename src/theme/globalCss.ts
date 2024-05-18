import { css } from '@mui/material'

export const GlobalCss = (palette: ITheme['palette']) => css`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${palette.mode === 'dark' ? palette.grey[100] : palette.neutral[100]} inset !important;
    border-radius: 0px !important;
  }

  & .MuiPagination-ul {
    li {
      &:first-of-type,
      &:last-of-type {
        transform: rotate(180deg);
        [dir='ltr'] & {
          transform: rotate(0deg);
        }
      }
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .leaflet-container {
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 24px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }

  .leaflet-control-geosearch form input {
    padding-inline: 16px;
  }

  .leaflet-control-geosearch .results > * {
    color: #000;
  }
`
