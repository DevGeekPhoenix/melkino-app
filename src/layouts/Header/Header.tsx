import React, { useCallback, useState } from 'react'
import {
  HeaderAppBar,
  HeaderContainer,
  HeaderLink,
  NavBarAppBox,
  ThemeSelectorButton,
  ThemeSelectorContainer,
} from './Header.styles'
import { Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useDarkSelector } from '@/libs/providers/StateManagerProvider/App.selectors'
import { useAppDispatch } from '@/libs/providers/StateManagerProvider/selectors'
import { setCookie } from 'cookies-next'
import { setIsDark } from '@/libs/providers/StateManagerProvider/App.reducer'
import Moon from '../../../public/svgs/Moon'
import Sun from '../../../public/svgs/Sun'
import User from '../../../public/svgs/User'
import Exit from '../../../public/svgs/Exit'
import ManageAdsModal from '@/domains/shared/ManageAdsModal'

const Header = () => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */

  const { status, data } = useSession()

  const isDark = useDarkSelector()
  const dispatch = useAppDispatch()

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const handleChangeTheme = useCallback(() => {
    dispatch(setIsDark(!isDark))

    setCookie('theme', isDark ? 'light' : 'dark')
  }, [isDark])

  /**
   * Template
   * _______________________________________________________________________________
   */

  return (
    <HeaderAppBar variant="elevation" color="transparent">
      <HeaderContainer>
        <Toolbar disableGutters sx={{ height: '100%' }}>
          <NavBarAppBox component={'ul'} display="flex" flexGrow={1}>
            <Grid display="flex" alignItems="center" gap={{ xs: 2, sm: 10 }}>
              <HeaderLink href={'/'}>
                <Typography fontSize={{ xs: '20px', sm: '28px' }} variant="h2" color="#004d40">
                  ملکینو
                </Typography>
              </HeaderLink>
              {status === 'authenticated' && (
                <Typography sx={{ cursor: 'pointer' }} variant="subtitle2" onClick={() => setIsCreateModalOpen(true)}>
                  آگهی جدید
                </Typography>
              )}
            </Grid>
            <Grid display="flex" alignItems="center" gap={2}>
              <ThemeSelectorContainer>
                <ThemeSelectorButton onClick={handleChangeTheme} disableRipple={false}>
                  {!isDark ? <Moon aria-label="change theme" /> : <Sun aria-label="change theme" />}
                </ThemeSelectorButton>
              </ThemeSelectorContainer>
              {status === 'unauthenticated' && (
                <Box display="flex" gap={2}>
                  <Link href="/signup" passHref>
                    <Button sx={{ whiteSpace: 'nowrap' }} size="small" variant="contained">
                      ثبت نام
                    </Button>
                  </Link>

                  <Link legacyBehavior href="/signin" passHref>
                    <Button size="small" variant="outlined">
                      ورود
                    </Button>
                  </Link>
                </Box>
              )}
              {status === 'authenticated' && (
                <Grid display="flex" alignItems="center" gap={1}>
                  <Typography>{(data?.user?.name as string) || 'خوش آمدید'}</Typography>
                  <User />
                  <IconButton onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}>
                    <Exit />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </NavBarAppBox>
        </Toolbar>
      </HeaderContainer>

      <ManageAdsModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen((prev) => !prev)} action="create" />
    </HeaderAppBar>
  )
}

export default Header
