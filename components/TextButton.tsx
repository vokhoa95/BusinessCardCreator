import clsx from 'clsx'
import { Text } from 'react-native'
import AppButton, { AppButtonProps } from './AppButton'

interface TextButtonProps extends Omit<AppButtonProps, 'children'> {
  title: string
}

const TextButton = (props: TextButtonProps) => {
  const { title, accessibilityLabel = title, buttonStyle = 'primary', ...buttonProps } = props

  return (
    <AppButton accessibilityLabel={accessibilityLabel} buttonStyle={buttonStyle} {...buttonProps}>
      <Text className={clsx('font-medium text-xl', buttonStyle === 'primary' ? 'text-light-ui-100' : 'text-sky')}>
        {title}
      </Text>
    </AppButton>
  )
}

export default TextButton
