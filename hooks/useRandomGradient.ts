import { useCallback, useMemo } from 'react'

type GradientColor = {
  start: string
  end: string
}

const useRandomGradient = (): GradientColor => {
  const randomColor = useCallback(() => {
    const colors = ['#F5A5A5', '#F5D1A5', '#D1F5A5', '#A5F5D1', '#AED2F6', '#D1A5F5']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }, [])

  const gradient = useMemo(() => {
    const startColor = randomColor()
    const endColor = randomColor()
    const result: GradientColor = {
      start: startColor,
      end: startColor !== endColor ? endColor : '#fff',
    }
    return result
  }, [randomColor])

  return gradient
}

export default useRandomGradient
