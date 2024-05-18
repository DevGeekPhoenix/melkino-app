import Image from 'next/image'
import { AdsHomeContainer, BannerContainer, HomeContainer } from './Home.styles'
import { Grid, Typography } from '@mui/material'
import Search from './components/Search/Search'

const Home = () => {
  return (
    <HomeContainer container pb={12}>
      <Grid container position="sticky" width="100vw" top={64} right={0} zIndex="-1" height={{ xs: 400, sm: 600 }}>
        <Image src={'/images/LandingBG.jpg'} alt={'landing background'} fill objectFit="cover" />
        <BannerContainer
          width={{ xs: '100%', sm: 'auto' }}
          top={{ xs: '25%', sm: '35%' }}
          textAlign={{ xs: 'center', sm: 'start' }}
          padding={{ xs: '40px 20px', sm: '60px 40px' }}
          borderRadius={{ xs: '0px', sm: '10px 0 0 10px' }}
        >
          <Typography variant="h1" color="primary" fontSize={{ xs: '20px', sm: '32px' }}>
            خانه رویایی خود را با ما پیدا کنید
          </Typography>
          <Typography variant="body3" color="black">
            پلتفرم خرید، فروش و رهن مسکن ملکینو
          </Typography>
        </BannerContainer>
      </Grid>
      <AdsHomeContainer container paddingX={{ xs: '16px', sm: '24px', md: '80px' }}>
        <Search />
      </AdsHomeContainer>
    </HomeContainer>
  )
}

export default Home
