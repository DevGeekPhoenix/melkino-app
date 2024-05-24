import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../tmp/db.json'
import { AdsType } from '@/types/api/Ads'
import { writeFileSync } from 'fs'
import { User } from '@/types/api/User'
import path from 'path'

type Data = {
  status: string
  data?: null
  message?: string
}

const dbPath = process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'json') + '/tmp/db.json' : 'tmp/db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      status: 'error',
      data: undefined,
      message: 'شناسه نامعتبر',
    })
  }

  const ads = db.ads as AdsType[]

  const users = db.users as User[]

  const usersWithAds = users
    .filter((user) => user.userAds.includes(id as string))
    .map((user) => {
      return {
        ...user,
        userAds: user.userAds.filter((adsId) => adsId !== id),
      }
    })

  const usersWithoutAds = users.filter((user) => !user.userAds.includes(id as string))

  const filteredAds = ads.filter((ads) => ads.id !== id)

  writeFileSync(dbPath, JSON.stringify({ ads: filteredAds, users: [...usersWithoutAds, ...usersWithAds] }))

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
