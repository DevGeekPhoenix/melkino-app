import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../tmp/db.json'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { writeFileSync } from 'fs'
import path from 'path'

type Data = {
  status: string
  data: string | null
  message: string
}

const dbPath = process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'json') + '/tmp/db.json' : 'tmp/db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, userName, password, phoneNumber } = req.body

  const users = db.users

  try {
    const user = users.find((userData) => {
      return userData.userName === userName
    })

    if (user)
      return res.status(500).json({
        status: 'failed',
        data: null,
        message: 'اکانت کاربری موجود می باشد',
      })

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return

      bcrypt.hash(password, salt, (err, hash) => {
        if (err || !hash)
          return res.status(500).json({
            status: 'error',
            data: null,
            message: 'خطا در ارتباط با سرور',
          })

        const newUser = {
          name,
          userName,
          phoneNumber,
          password: hash,
          id: uuidv4(),
          userAds: [],
        }

        const newUserDb = [...db.users, newUser]

        writeFileSync(dbPath, JSON.stringify({ ads: db.ads, users: newUserDb }))

        res.status(200).json({
          status: 'success',
          data: '/signin',
          message: 'ثبت نام با موفقیت انجام شد',
        })
      })
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'خطا در ارتباط با سرور',
    })
  }
}
