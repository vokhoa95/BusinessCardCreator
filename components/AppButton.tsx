import { clsx } from 'clsx'
import { PropsWithChildren } from 'react'
import { Pressable, PressableProps } from 'react-native'

export interface AppButtonProps
  extends Omit<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'onFocus' | 'onBlur'> {
  onPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  onLongPress?: () => void
  onFocus?: () => void
  onBlur?: () => void
  buttonStyle?: 'primary' | 'secondary'
}

const AppButton = (props: PropsWithChildren<AppButtonProps>) => {
  const { accessibilityRole = 'button', children, buttonStyle = 'primary', ...pressableProps } = props

  const buttonClassName = clsx(
    'px-4 py-4 justify-center items-center border-4 rounded-xl',
    buttonStyle === 'primary' && 'bg-sky-500 border-sky-500 active:bg-sky-600 active:border-sky-600 ',
    buttonStyle === 'secondary' && 'bg-white border-sky-500 active:opacity-60'
  )

  return (
    <Pressable {...pressableProps} {...{ accessibilityRole }} className={buttonClassName}>
      {children}
    </Pressable>
  )
}

export default AppButton
