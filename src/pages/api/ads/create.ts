import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../public/db.json'
import { AdsType } from '@/types/api/Ads'
import { v4 as uuidv4 } from 'uuid'
import { writeFileSync } from 'fs'
import { User } from '@/types/api/User'
import path from 'path'

type Data = {
  status: string
  data?: null
  message?: string
}

const dbPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, 'tmp/db.json') : 'tmp/db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { coordinates, createdBy, bedrooms, size, region, streetAddress, description } = req.body

  if (!coordinates || !createdBy || !bedrooms || !size || !region || !streetAddress || !description) {
    return res.status(400).json({
      status: 'error',
      data: undefined,
      message: 'اطلاعات ناقص می باشند',
    })
  }

  const ads = db.ads as AdsType[]

  const users = db.users as User[]

  const userIndex = users.indexOf(users.find((user) => user.id === createdBy) as User)

  const newAds = {
    coordinates,
    id: uuidv4(),
    createdBy,
    bedrooms,
    size,
    region,
    streetAddress,
    description,
  }

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      userAds: [...users[userIndex].userAds, newAds.id],
    }
  }

  const modifiedAds = [newAds, ...ads]

  writeFileSync('public/db.json', JSON.stringify({ ads: modifiedAds, users: users }))

  console.log(ads)

  try {
    res.status(200).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: undefined,
      message: 'خطا در ارتباط با سرور',
    })
  }
}
