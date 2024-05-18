import { styled } from '@/theme'
import { AppBar, Box, Grid, IconButton } from '@mui/material'
import Link from 'next/link'

export const HeaderAppBar = styled(AppBar)(
  ({ theme: { palette } }) => `
  height: 64px;
  width:100%;
  padding-inline: 24px;
  box-shadow: none;
  position: sticky;
  top: 0px;
  z-index: 1030;
  background-color: #34d39995;
  backdrop-filter: blur(10px);
`,
)

export const HeaderContainer = styled(Grid)(
  ({ theme: { spacing, breakpoints } }) => `
  width: 100%;
  height: 100%;
  &.MuiContainer-root{
    padding:${spacing(0, 6)};
  };
  ${breakpoints.down('sm')}{
    &.MuiContainer-root {
      padding-inline:8px;
    };
  };
  
`,
)

export const NavBarAppBox = styled(Box)(
  () => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-grow: 1:
  margin:0;
  padding:0;
  
`,
)

export const HeaderLink = styled(Link)(
  ({ theme: { spacing, breakpoints, typography } }) => `
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${spacing(2)};
    cursor: pointer;
    font-size: ${typography.body1};
    color: inherit;
    ${breakpoints.down('md')}{
      font-size: ${typography.caption};
    };
  `,
)

export const ThemeSelectorContainer = styled('div')(
  () => `
  display: flex;
  align-items: center;
  justify-content: center;
`,
)
export const ThemeSelectorButton = styled(IconButton)(
  () => `
  width: 36px;
  height: 36px;
  color: inherit;
`,
)
