import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Signup = dynamic(() => import('@/domains/Auth/Signup/'))

type SignupPageProps = {}

const SignupPage: NextPage<SignupPageProps> = ({}) => {
  return <Signup />
}

SignupPage.prototype = {
  pageConfig: {
    pageTitleKey: 'SignupPage',
  },
}

export default SignupPage
