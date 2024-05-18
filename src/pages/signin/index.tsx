import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Signin = dynamic(() => import('@/domains/Auth/Signin/'))

type SigninPageProps = {}

const SigninPage: NextPage<SigninPageProps> = ({}) => {
  return <Signin />
}

SigninPage.prototype = {
  pageConfig: {
    pageTitleKey: 'Signinpage',
  },
}

export default SigninPage
