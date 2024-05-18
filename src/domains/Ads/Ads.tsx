import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useGetAdsByIdQuery } from './Ads.services'
import { useRouter } from 'next/router'
import Location from '../../../public/svgs/Location'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { User } from '@/types/api/User'
import { Map } from '@/libs/ui-premitives/map'
import ManageAdsModal from '../shared/ManageAdsModal'
import DeleteModal from './components/DeleteModal'

const Ads = () => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */

  const {
    query: { adsId },
  } = useRouter()

  const { data: userData } = useSession()

  const { data: adsData, isError, error } = useGetAdsByIdQuery({ id: adsId as string }, { skip: !adsId })

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (isError) {
      toast.error((error as { data: { message: string } }).data.message)
    }
  }, [isError])

  /**
   * Template
   * _______________________________________________________________________________
   */

  return (
    <Grid container paddingX={{ xs: '16px', sm: '24px', md: '80px' }} maxWidth="1440px" marginX="auto">
      <Grid container justifyContent="center">
        <Grid container position="relative" width="100vw" marginTop={10} height={{ xs: 400, sm: 600 }}>
          <Image
            src={'/images/AdsImage.jpg'}
            alt={'landing background'}
            fill
            objectFit="cover"
            style={{ borderRadius: 24, boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)' }}
          />
        </Grid>
      </Grid>
      <Grid container flexDirection={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between" gap={4} mt={4}>
        <Grid display="flex" flexDirection="column" gap={1} pb={2}>
          <Typography variant="subtitle1">{adsData?.description} </Typography>
          {(userData?.user as User)?.id === (adsData?.createdBy as string) && (
            <Typography component="span" variant="body1" color="secondary">
              آگهی شده توسط شما
            </Typography>
          )}
          <Grid container alignItems="center" gap={1} pb={3}>
            <Location />
            <Typography variant="body2" color="teal">
              {adsData?.streetAddress}
            </Typography>
          </Grid>
          <Typography variant="body1">منطقه: {adsData?.region}</Typography>
          <Typography variant="body1">متراژ: {adsData?.size}</Typography>
          <Typography variant="body1">تعداد اتاق خواب: {adsData?.bedrooms}</Typography>
        </Grid>
        <Grid width={{ xs: '100%', sm: 'auto' }} flexWrap="nowrap" display="flex" gap={4}>
          <Button fullWidth variant="contained" color="inherit" onClick={() => setIsEditModalOpen(true)}>
            <Typography variant="body1">ویرایش</Typography>
          </Button>
          <Button fullWidth variant="contained" color="error" onClick={() => setIsDeleteModalOpen(true)}>
            <Typography variant="body1" color="white">
              حذف
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container flexDirection="column" alignItems="center" gap={4} pb={8}>
        <Typography variant="h5"> موقعیت مکانی</Typography>
        <Grid container width={{ sm: '75%', md: '60%' }} height="400px">
          <Map
            position={adsData?.coordinates as [number, number]}
            popupText={adsData?.streetAddress}
            dragging={false}
          />
        </Grid>
      </Grid>

      <ManageAdsModal
        adsData={adsData}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen((prev) => !prev)}
        action="edit"
      />

      <DeleteModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen((prev) => !prev)} />
    </Grid>
  )
}

export default Ads
