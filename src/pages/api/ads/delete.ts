import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../public/db.json'
import { AdsType } from '@/types/api/Ads'
import { writeFileSync } from 'fs'
import { User } from '@/types/api/User'

type Data = {
  status: string
  data?: null
  message?: string
}

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

  writeFileSync('public/db.json', JSON.stringify({ ads: filteredAds, users: [...usersWithoutAds, ...usersWithAds] }))

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
