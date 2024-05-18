import { styled } from '@/theme'
import { Grid, Modal } from '@mui/material'

export const StyledModal = styled(Modal)(
  ({ theme: { palette, breakpoints } }) => `
  background-color: ${palette.neutral[200]}75;
  display: flex;
  justify-content: center;
  align-items: center;
  >.MuiGrid-root.MuiGrid-item {
    width: 375px;
    max-width: 375px;
  }
`,
)

export const ModalContainer = styled(Grid)(
  ({ theme: { palette, shadows } }) => `
  width: auto;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  width: 375px;
  background-color: ${palette.neutral[50]};
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;

  height: 100%;
  max-height: 718px;


  `,
)

export const InputsContainer = styled(Grid)(
  ({ theme: { palette } }) => `


    & label {
      transform-origin: right !important;
      left: inherit !important;
      right: 1.75rem !important;
    }
    & legend {
      text-align: right;
    }
    & .MuiFormHelperText-root {
      text-align: left !important;
      color: ${palette.error.main} !important;
      position: absolute;
      left: 0px;
      margin-top: 14px;
    }
`,
)
