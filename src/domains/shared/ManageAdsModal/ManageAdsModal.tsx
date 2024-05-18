import React, { useEffect } from 'react'
import { ManageAdsFormTypes, ManageAdsModalProps } from './ManageAdsModal.types'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { InputsContainer, ModalContainer, StyledModal } from './ManageAdsModal.styles'
import { useForm } from 'react-hook-form'
import { object } from 'yup'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Map } from '@/libs/ui-premitives/map'
import { adsApi, useCreateAdsMutation, useEditAdsByIdMutation } from '@/domains/Ads/Ads.services'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { User } from '@/types/api/User'
import { useRouter } from 'next/router'
import { homeApi } from '@/domains/Home/Home.services'

const ManageAdsModal = ({ open, action, adsData, onClose }: ManageAdsModalProps) => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */

  const { data: userData, status } = useSession()

  const { push } = useRouter()

  const [editAds, editAdsResult] = useEditAdsByIdMutation()
  const [createAds, createAdsResult] = useCreateAdsMutation()

  const { refetch: refetchAdsData } = adsApi.endpoints.getAdsById.useQuery(
    { id: adsData?.id as string },
    { skip: !adsData?.id },
  )

  const { refetch: refetchAllAdsData } = homeApi.endpoints.getAds.useQuery(null)

  /**
   * Consts and Variables
   * _______________________________________________________________________________
   */

  const manageAdsValidate: yup.ObjectSchema<any> = object().shape({
    coordinates: yup.object().shape({
      lat: yup.number(),
      lng: yup.number(),
    }),
    bedrooms: yup.string().required('لطفا تعداد اتاق خواب را وارد کنید'),
    size: yup.string().required('لطفا متراژ را وارد کنید'),
    region: yup.string().required('لطفا محدوده خانه را وارد کنید'),
    streetAddress: yup.string().required('لطفا آدرس را وارد کنید'),
    description: yup.string().required('لطفا توضیحات خانه را وارد کنید'),
  })

  const defaultValues = {
    bedrooms: adsData?.bedrooms,
    coordinates: adsData?.coordinates,
    description: adsData?.description,
    region: adsData?.region,
    size: adsData?.size,
    streetAddress: adsData?.streetAddress,
  }

  const formMethods = useForm<ManageAdsFormTypes>({
    resolver: yupResolver(manageAdsValidate),
    mode: 'onChange',
  })

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = formMethods

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (action === 'edit') {
      reset(defaultValues)
    }
  }, [adsData])

  useEffect(() => {
    if (editAdsResult.isSuccess) {
      refetchAdsData()
      toast.success(editAdsResult?.data?.message)
      onClose()
      reset()
    }
    if (editAdsResult.isError) {
      toast.error((editAdsResult?.error as { data: { message: string } }).data?.message)
    }
  }, [editAdsResult])

  useEffect(() => {
    if (createAdsResult.isSuccess) {
      refetchAllAdsData()
      toast.success(createAdsResult?.data?.message)
      onClose()
      reset()
    }
    if (createAdsResult.isError) {
      toast.error((createAdsResult?.error as { data: { message: string } }).data?.message)
    }
  }, [createAdsResult])

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const onSubmit = (formValues: ManageAdsFormTypes) => {
    if (status === 'authenticated') {
      action === 'edit'
        ? editAds(Object.assign(formValues, { id: adsData?.id as string, createdBy: adsData?.createdBy }))
        : createAds(
            Object.assign(formValues, {
              createdBy: (userData?.user as User)?.id,
              coordinates: formValues.coordinates || [35.6892, 51.389],
            }),
          )
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
    <StyledModal disableAutoFocus disableEnforceFocus open={open} onClose={onClose}>
      <ModalContainer position="relative">
        <form style={{ width: '100%' }}>
          <Typography variant="h3" pb={3}>
            {action === 'edit' ? 'ویرایش آگهی' : 'ثبت آگهی'}
          </Typography>
          <Grid container justifyContent="center">
            <InputsContainer flexDirection="column" justifyContent="center" container gap="12px">
              <TextField
                label="متراژ"
                {...register('size')}
                autoComplete="off"
                helperText={errors.size?.message}
                error={!!errors.size?.message}
              />
              <TextField
                label="تعداد اتاق خواب"
                {...register('bedrooms')}
                autoComplete="off"
                helperText={errors.bedrooms?.message}
                error={!!errors.bedrooms?.message}
              />
              <TextField
                label="محدوده خانه"
                {...register('region')}
                autoComplete="off"
                helperText={errors.region?.message}
                error={!!errors.region?.message}
              />
              <TextField
                label="آدرس"
                {...register('streetAddress')}
                autoComplete="off"
                helperText={errors.streetAddress?.message}
                error={!!errors.streetAddress?.message}
              />
              <TextField
                label="توضیحات"
                {...register('description')}
                autoComplete="off"
                helperText={errors.description?.message}
                error={!!errors.description?.message}
              />
              <Grid container flexDirection="column" gap={2}>
                <Typography variant="body2"> موقعیت مکانی</Typography>
                <Grid container height="250px">
                  <Map
                    position={(adsData?.coordinates as [number, number]) || [35.6892, 51.389]}
                    onPositionChanged={(positions) => setValue('coordinates', positions)}
                    dragging
                  />
                </Grid>
              </Grid>
              <Grid container flexWrap="nowrap" minWidth={335} justifyContent="space-between" gap="12px">
                <Button variant="outlined" size="large" sx={{ minWidth: '160px' }} onClick={onClose}>
                  بستن
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ minWidth: '160px' }}
                  disabled={
                    !!errors.size?.message ||
                    !!errors.bedrooms?.message ||
                    !!errors.region?.message ||
                    !!errors.streetAddress?.message ||
                    !!errors.description?.message
                  }
                  onClick={() => onSubmit(watch())}
                >
                  {action === 'edit' ? 'ثبت ویرایش' : 'ثبت آگهی'}
                </Button>
              </Grid>
            </InputsContainer>
          </Grid>
        </form>
      </ModalContainer>
    </StyledModal>
  )
}

export default ManageAdsModal
