import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../public/db.json'
import { User } from '@/types/api/User'
import bcrypt from 'bcrypt'

type Data = {
  status: string
  data: Omit<User, 'password'> | null
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userName } = req.body

  const users = db.users

  try {
    const user = users.find((userData) => {
      return userData.userName === userName
    })

    if (!user)
      return res.status(500).json({
        status: 'failed',
        data: null,
        message: 'نام کاربری یا رمز عبور اشتباه است',
      })

    const isPasswordValid = bcrypt.compare(`${req.body.password}`, user.password)

    if (!isPasswordValid)
      return res.status(500).json({
        status: 'failed',
        data: null,
        message: 'نام کاربری یا رمز عبور اشتباه است',
      })

    const { password, ...user_data } = user

    res.status(200).json({
      status: 'success',
      data: user_data,
      message: 'ورود با موفقیت انجام شد',
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'خطا در ارتباط با سرور',
    })
  }
}
