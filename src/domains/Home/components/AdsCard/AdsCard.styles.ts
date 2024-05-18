import { styled } from '@/theme'
import { Grid } from '@mui/material'
import Image from 'next/image'

export const StyledImage = styled(Image)<{ isloading: boolean }>(
  ({ isloading, theme: { palette } }) => `
  transition: opacity 0.2s ease-in-out;
  background-color: ${palette.neutral[100]};
  ${isloading && `opacity: 0;`};


`,
)

export const CardContainer = styled(Grid)(
  ({ theme: { palette } }) => `
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
  background-color: ${palette.neutral[100]};
`,
)
