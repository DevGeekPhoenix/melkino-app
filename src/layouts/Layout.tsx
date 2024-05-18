import React, { ReactNode } from 'react'
import Header from './Header/Header'
import { LayoutContainer } from './Layout.styles'
import { CustomToast } from '@/libs/ui-premitives/custom-toast'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutContainer container>
      <Header />
      <CustomToast />

      {children}
    </LayoutContainer>
  )
}

export default Layout
