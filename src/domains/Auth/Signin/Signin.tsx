import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { object } from 'yup'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginTypes } from './Signin.types'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { SigninForm } from './Signin.styles'

const Signin = () => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */
  const { push } = useRouter()

  const iranianPhoneNumberRegex = /^09\d{9}$/

  const loginValidate: yup.ObjectSchema<any> = object().shape({
    userName: yup
      .string()
      .required('لطفا شماره موبایل خود را وارد کنید')
      .test('phoneNumber', 'شماره موبایل صحیح نیست', (phoneNumber) => {
        return iranianPhoneNumberRegex.test(phoneNumber)
      }),
    password: yup.string().required('لطفا رمزعبور خود را وارد کنید'),
  })

  const formMethods = useForm<LoginTypes>({
    resolver: yupResolver(loginValidate),
    mode: 'onChange',
  })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = formMethods

  /**
   * Consts and Variables
   * _______________________________________________________________________________
   */

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const onSubmit = (data: LoginTypes) => {
    const userData = {
      password: data.password,
      phoneNumber: data.userName,
      userName: data.userName,
      redirect: false,
    }

    signIn('credentials', userData)
      .then((res) => {
        if (res?.ok) {
          push('/')
          toast.success('خوش آمدید')
        } else {
          toast.error(res?.error)
        }
      })
      .catch((error) => {
        toast.error('رمز عبور یا شماره موبایل اشتباه است')
      })
  }

  /**
   * Template
   * _______________________________________________________________________________
   */
  return (
    <Grid
      container
      flexDirection="column"
      gap={20}
      mt="24px"
      paddingX={{ xs: '16px', sm: '24px', md: '80px' }}
      maxWidth="1440px"
      marginX="auto"
    >
      <Typography variant="subtitle1">
        جهت ورود به حساب کاربری، شماره تلفن همراه و رمز عبور خود را وارد کنید.
      </Typography>
      <SigninForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container flexDirection="column" gap={2}>
          <Typography variant="body1">شماره همراه </Typography>
          <TextField placeholder="مثال: 09123456789" {...register('userName')} />
          {errors.userName?.message && (
            <Typography variant="body2" color="error">
              {errors.userName?.message}
            </Typography>
          )}
        </Grid>

        <Grid container flexDirection="column" gap={2}>
          <Typography variant="body1">رمز عبور </Typography>
          <TextField type="password" {...register('password')} />
          {errors.password?.message && (
            <Typography variant="body2" color="error">
              {errors.password?.message}
            </Typography>
          )}
        </Grid>
        <Button fullWidth disabled={!isValid} type="submit" variant="contained" size="large">
          ورود
        </Button>
      </SigninForm>
    </Grid>
  )
}

export default Signin
