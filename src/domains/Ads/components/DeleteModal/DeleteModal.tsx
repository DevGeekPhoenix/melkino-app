import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { DeleteModalProps } from './DeleteModal.types'
import { ModalContainer, StyledModal } from './DeleteModal.styles'
import { useDeleteAdsByIdMutation } from '../../Ads.services'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const DeleteModal = ({ open, onClose }: DeleteModalProps) => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */

  const {
    push,
    query: { adsId },
  } = useRouter()

  const { status } = useSession()

  const [deleteAds, deleteAdsResult] = useDeleteAdsByIdMutation()

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (deleteAdsResult.isSuccess) {
      push('/')
      toast.success(deleteAdsResult?.data?.message)
    }
    if (deleteAdsResult.isError) {
      toast.error((deleteAdsResult?.error as { data: { message: string } }).data?.message)
    }
  }, [deleteAdsResult])

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const handleDeleteAds = () => {
    if (status === 'authenticated') {
      deleteAds({ id: adsId as string })
    } else {
      toast.error('ابتدا ورود کنید')
      push('/signin')
    }
  }

  /**
   * Template
   * _______________________________________________________________________________
   */

  return (
    <StyledModal disableAutoFocus disableEnforceFocus disablePortal open={open} onClose={onClose}>
      <ModalContainer position="relative" textAlign="center">
        <Typography variant="h4">آیا از حذف آگهی اطمینان دارید؟</Typography>
        <Grid container flexWrap="nowrap" minWidth={335} justifyContent="space-between" gap="12px" mt="64px">
          <Button variant="outlined" size="large" sx={{ minWidth: '160px' }} onClick={onClose}>
            بستن
          </Button>
          <Button
            variant="contained"
            size="large"
            color="error"
            sx={{ minWidth: '160px' }}
            onClick={() => handleDeleteAds()}
          >
            <Typography variant="body1" color="white">
              حذف آگهی
            </Typography>
          </Button>
        </Grid>
      </ModalContainer>
    </StyledModal>
  )
}

export default DeleteModal
