import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Ads = dynamic(() => import('@/domains/Ads'))

type AdsPageProps = {}

const AdsPage: NextPage<AdsPageProps> = ({}) => {
  return <Ads />
}

AdsPage.prototype = {
  pageConfig: {
    pageTitleKey: 'AdsPage',
  },
}

export default AdsPage
