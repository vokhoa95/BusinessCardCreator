import { useWindowDimensions } from 'react-native'

export type FormFactor = 'mobile' | 'tablet'

export default function useFormFactor(): FormFactor {
  const { width, height } = useWindowDimensions()
  return Math.min(width, height) <= 480 ? 'mobile' : 'tablet'
}
