import { getCookie, setCookie } from 'cookies-next'
import MyApp, { AppContext, AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { EmotionCache } from '@emotion/cache'
import { OptionsType } from 'cookies-next/lib/types'
import { Session } from 'next-auth'
import createEmotionCache from '@/theme/createEmotionCache'
import '@/libs/providers/ProgressProvider/ProgressProvider.styles.css'

const Layout = dynamic(() => import('@/layouts/Layout'))
const StateManagerProvider = dynamic(() => import('@/libs/providers/StateManagerProvider'))
const ThemeProvider = dynamic(() => import('@/libs/providers/ThemeProvider'))
const ClientConfigProvider = dynamic(() => import('@/libs/providers/ClientConfigProvider'))
const ProgressProvider = dynamic(() => import('@/libs/providers/ProgressProvider'))
const ErrorBoundaryProvider = dynamic(() => import('@/libs/providers/ErrorBoundaryProvider'))

interface AppPageProps extends AppProps {
  emotionCache?: EmotionCache
  clientConfig: { theme: string }
  pageProps: { session: Session | null }
}

// create initial Emotion Cache
const clientSideEmotionCache = createEmotionCache()

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
  clientConfig,
}: AppPageProps) {
  return (
    <StateManagerProvider>
      <ClientConfigProvider clientConfig={clientConfig}>
        <ThemeProvider emotionCache={emotionCache}>
          <AuthProvider session={session}>
            <ProgressProvider>
              <ErrorBoundaryProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ErrorBoundaryProvider>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </ClientConfigProvider>
    </StateManagerProvider>
  )
}

App.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const appProps = await MyApp.getInitialProps(appContext)

  const { req, res } = appContext.ctx

  const getCookieOptions = { req, res }
  const setCookieOptions = { req, res } as OptionsType | undefined

  const theme = getCookie('theme', getCookieOptions) ? getCookie('theme', getCookieOptions) : 'dark'

  if (!theme) {
    setCookie('theme', 'dark', setCookieOptions)
  }

  const clientConfig = {
    theme,
  }

  return { ...appProps, clientConfig }
}

export default App
