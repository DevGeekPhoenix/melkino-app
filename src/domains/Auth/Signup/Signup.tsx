import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { object } from 'yup'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { SignupForm } from './Signup.styles'
import { RegisterTypes } from './Signup.types'
import { useRegisterMutation } from './Signup.services'
import { useEffect } from 'react'

const Signup = () => {
  /**
   * External Hooks
   * ______________________________________________________________________________
   */
  const { push } = useRouter()

  const [postRegister, postRegisterResult] = useRegisterMutation()

  const iranianPhoneNumberRegex = /^09\d{9}$/

  const registerValidate: yup.ObjectSchema<any> = object().shape({
    userName: yup
      .string()
      .required('لطفا شماره موبایل خود را وارد کنید')
      .test('phoneNumber', 'شماره موبایل صحیح نیست', (phoneNumber) => {
        return iranianPhoneNumberRegex.test(phoneNumber)
      }),
    password: yup.string().required('لطفا رمزعبور خود را وارد کنید'),
    name: yup.string().required('لطفا نام خود را وارد کنید'),
  })

  const formMethods = useForm<RegisterTypes>({
    resolver: yupResolver(registerValidate),
    mode: 'onChange',
  })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = formMethods

  /**
   * States and Effects and Hooks
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (postRegisterResult.isSuccess) {
      toast.success(postRegisterResult?.data?.message)
      push(postRegisterResult?.data?.data)
    }
    if (postRegisterResult.isError) {
      toast.error((postRegisterResult?.error as { data: { message: string } })?.data?.message)
    }
  }, [postRegisterResult])

  /**
   * Methods
   * _______________________________________________________________________________
   */

  const onSubmit = (data: RegisterTypes) => {
    const userData = {
      name: data.name,
      password: data.password,
      phoneNumber: data.userName,
      userName: data.userName,
    }

    postRegister(userData)
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
      <Typography variant="subtitle1">جهت ساخت حساب کاربری، فرم را تکمیل کنید.</Typography>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
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
          <Typography variant="body1">نام و نام خانوادگی </Typography>
          <TextField placeholder="مثال: حمید اصغری" {...register('name')} />
          {errors.name?.message && (
            <Typography variant="body2" color="error">
              {errors.name?.message}
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
          ثبت نام
        </Button>
      </SignupForm>
    </Grid>
  )
}

export default Signup
