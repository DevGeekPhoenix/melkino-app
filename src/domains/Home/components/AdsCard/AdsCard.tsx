import React from 'react'
import { AdsCardProps } from './AdsCard.types'
import { Grid, Typography } from '@mui/material'
import { CardContainer, StyledImage } from './AdsCard.styles'
import Location from '../../../../../public/svgs/Location'
import Link from 'next/link'

const AdsCard = ({ ads, isLoading }: AdsCardProps) => {
  return (
    <Link href={`/ads/${ads.id}`}>
      <CardContainer display="flex" flexDirection="column" gap={4}>
        <Grid position="relative" height={{ xs: '200px', sm: '350px' }} width="100%">
          <StyledImage
            isloading={isLoading}
            src={'/images/AdsImage.jpg'}
            alt={'img'}
            fill
            loading="lazy"
            style={{ objectFit: 'cover' }}
            sizes="(max-width:1440px)"
          />
        </Grid>
        <Grid container flexDirection="column" px={4} gap={1} pb={2}>
          <Typography variant="subtitle1">{ads.description}</Typography>
          <Grid container alignItems="center" gap={1} pb={3}>
            <Location />
            <Typography variant="body2" color="teal">
              {ads.streetAddress}
            </Typography>
          </Grid>
          <Typography variant="body1">منطقه: {ads.region}</Typography>
          <Typography variant="body1">متراژ: {ads.size}</Typography>
          <Typography variant="body1">تعداد اتاق خواب: {ads.bedrooms}</Typography>
        </Grid>
      </CardContainer>
    </Link>
  )
}

export default AdsCard
