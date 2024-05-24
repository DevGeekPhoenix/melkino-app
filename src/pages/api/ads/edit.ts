import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../public/db.json'
import { AdsType } from '@/types/api/Ads'
import { writeFileSync } from 'fs'
import path from 'path'

type Data = {
  status: string
  data?: null
  message?: string
}

const dbPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, 'tmp/db.json') : 'tmp/db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id, coordinates, streetAddress, bedrooms, size, region, description, createdBy } = req.body

  if (!id) {
    return res.status(400).json({
      status: 'error',
      data: undefined,
      message: 'شناسه نامعتبر',
    })
  }

  const ads = db.ads as AdsType[]

  const index = ads.indexOf(ads.find((ads) => ads.id === id) as AdsType)

  if (index !== -1) {
    ads[index] = {
      coordinates,
      id,
      createdBy,
      bedrooms: +bedrooms,
      size: +size,
      region,
      streetAddress,
      description,
    }

    writeFileSync('public/db.json', JSON.stringify({ ads: ads, users: db.users }))
  }

  console.log(ads)

  try {
    res.status(200).json({
      status: 'success',
      data: null,
      message: 'اطلاعات با موفقیت ویرایش شد',
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: undefined,
      message: 'خطا در ارتباط با سرور',
    })
  }
}
