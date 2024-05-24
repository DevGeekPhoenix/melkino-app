import { Button, Grid, Pagination, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SearchContainer } from './Search.styles'
import AdsCard from '../AdsCard'
import { useGetAdsQuery } from '../../Home.services'
import { useForm } from 'react-hook-form'
import { object } from 'yup'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchFormTypes } from './Search.types'
import { AdsType } from '@/types/api/Ads'

const Search = () => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */

  const { data, isFetching } = useGetAdsQuery(null)

  const loginValidate: yup.ObjectSchema<any> = object().shape({
    region: yup.string(),
    size: yup.string(),
    bedrooms: yup.string(),
  })

  const formMethods = useForm<SearchFormTypes>({
    resolver: yupResolver(loginValidate),
    mode: 'onChange',
  })

  const { register, handleSubmit, reset, watch } = formMethods

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  const [adsData, setAdsData] = useState<AdsType[]>([])
  const [activePaginationPage, setActivePaginationPage] = useState<number>(1)

  useEffect(() => {
    data ? setAdsData(data) : setAdsData([])
  }, [data])

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const onSubmit = () => {
    let filteredAdsData = data
      ?.filter((item) => item.region.toLowerCase().includes(watch('region')?.trim().toLowerCase()))
      .filter((item) => item.bedrooms.toString().includes(watch('bedrooms')))
      .filter((item) => item.size.toString().includes(watch('size')))

    setActivePaginationPage(1)
    setAdsData(filteredAdsData || [])
  }

  const resetFormData = () => {
    reset()
    setActivePaginationPage(1)
    setAdsData(data || [])
  }

  const handlePaginationChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setActivePaginationPage(value)
  }

  /**
   * Template
   * _______________________________________________________________________________
   */

  return (
    <form style={{ width: '100%', maxWidth: '1440px', marginInline: 'auto' }} onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center">
        <SearchContainer justifyContent="center" container gap="12px">
          <TextField label="محله" {...register('region')} autoComplete="off" />
          <TextField label="متراژ" {...register('size')} autoComplete="off" />
          <TextField label="تعداد اتاق خواب" {...register('bedrooms')} autoComplete="off" />
          <Button type="submit" variant="contained" size="large" sx={{ paddingInline: 23 }}>
            فیلتر
          </Button>
          <Button variant="outlined" size="large" sx={{ paddingInline: 21 }} onClick={resetFormData}>
            بازنشانی
          </Button>
        </SearchContainer>
      </Grid>
      <Grid container flexDirection="column" gap={2} textAlign="center">
        <Typography variant="h3">اجاره آپارتمان در تهران</Typography>
        <Typography variant="h6">
          در ملکینو می توانیم آپارتمانی در تهران با امکانات کامل و مبله کامل در بهترین مناطق تهران با بهترین امکانات
          رفاهی برای شما پیدا کنیم.
        </Typography>
      </Grid>
      <Grid
        container
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={9}
        mt={6}
      >
        {adsData?.slice((activePaginationPage - 1) * 6, (activePaginationPage - 1) * 6 + 6).map((ads) => (
          <AdsCard key={ads.id} ads={ads} isLoading={isFetching} />
        ))}
      </Grid>
      {adsData?.length === 0 && (
        <Typography textAlign="center" color="secondary" variant="h4">
          نتیجه ای یافت نشد!
        </Typography>
      )}
      <Grid container justifyContent="center" py={8}>
        <Pagination
          boundaryCount={1}
          siblingCount={0}
          page={activePaginationPage}
          onChange={handlePaginationChange}
          shape="rounded"
          variant="outlined"
          defaultPage={1}
          count={adsData?.length ? Math.ceil(adsData.length / 6) : 1}
        />
      </Grid>
    </form>
  )
}

export default Search
