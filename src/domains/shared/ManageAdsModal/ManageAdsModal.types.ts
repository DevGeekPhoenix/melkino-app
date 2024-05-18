import { AdsType } from '@/types/api/Ads'

export interface ManageAdsModalProps {
  adsData?: AdsType
  open: boolean
  action: 'create' | 'edit'
  onClose: () => void
}

export interface ManageAdsFormTypes {
  coordinates: [number, number]
  bedrooms: number
  size: number
  region: string
  streetAddress: string
  description: string
}
