import { styled } from '@/theme'
import { Grid } from '@mui/material'

export const SearchContainer = styled(Grid)(
  ({ theme: { palette } }) => `
    background-color: ${palette.neutral[100]};
    padding: 20px 30px;
    margin: -45px auto 40px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

    & label {
      transform-origin: right !important;
      left: inherit !important;
      right: 1.75rem !important;
    }
    & legend {
      text-align: right;
    }
    & .MuiFormHelperText-root.Mui-error {
      text-align: right;
    }
`,
)
