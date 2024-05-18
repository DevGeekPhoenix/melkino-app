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
  min-width: 375px;
  background-color: ${palette.neutral[50]};
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;

  height: 100%;
    max-height: 20%;


  `,
)
