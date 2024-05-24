import { styled } from '@/theme'
import { Grid } from '@mui/material'

export const HomeContainer = styled(Grid)(
  ({ theme: { spacing } }) => `
  

`,
)

export const AdsHomeContainer = styled(Grid)(
  ({ theme: { palette } }) => `
    margin-inline: auto;
    position: relative;
    z-index: 2;
    background-color: ${palette.background.default};
`,
)

export const BannerContainer = styled(Grid)(
  ({ theme: { palette } }) => `
  background-color: #b2dfdb95;
  justify-content: flex-start;
  position: absolute;
  z-index: 1;
  margin: auto;
  height: auto;
  backdrop-filter: blur(10px);
`,
)
