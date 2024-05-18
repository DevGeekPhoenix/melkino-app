import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../public/db.json'
import { AdsType } from '@/types/api/Ads'

type Data = {
  status: string
  data: AdsType[] | AdsType | undefined
  message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query

  const ads = db.ads as AdsType[]

  const modifiedAds = id ? ads.find((ads) => ads.id === id) : ads

  if (id ? !modifiedAds : !(modifiedAds as AdsType[]).length) {
    return res.status(400).json({
      status: 'error',
      data: undefined,
      message: 'اطلاعات یافت نشد',
    })
  }

  try {
    res.status(200).json({
      status: 'success',
      data: modifiedAds,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: undefined,
      message: 'خطا در ارتباط با سرور',
    })
  }
}
