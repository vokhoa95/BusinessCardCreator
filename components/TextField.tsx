import _ from 'lodash'
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface TextFieldProps extends Omit<TextInputProps, 'style' | 'multiline' | 'numberOfLines' | 'clearButtonMode'> {
  name?: string
  control: any
  title: string
  errorMessage?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: TextInputProps['style']
  clearButtonMode?: TextInputProps['clearButtonMode'] | 'when-not-empty'
}

export interface TextFieldHandle {
  focus(): void
  blur(): void
  clear(): void
  isFocused(): boolean
}

const TextField = forwardRef<TextFieldHandle, TextFieldProps>(
  (
    {
      title,
      style,
      inputStyle,
      onFocus,
      onBlur,
      onChangeText,
      clearButtonMode = 'never',
      control,
      errorMessage = '',
      name = '',
      ...textInputProps
    }: TextFieldProps,
    ref
  ) => {
    const { field } = useController({
      control,
      defaultValue: '',
      name,
    })
    const inputRef = useRef<TextInput>(null)
    const [isEmpty, setIsEmpty] = useState(_.isEmpty(textInputProps.value))
    const [focused, setFocused] = useState(inputRef.current?.isFocused() || false)

    const shouldShowClearButton = useMemo((): boolean => {
      switch (clearButtonMode) {
        case 'never':
          return false
        case 'unless-editing':
          return !focused
        case 'while-editing':
          return focused
        case 'always':
          return true
        case 'when-not-empty':
          return !isEmpty
      }
    }, [clearButtonMode, focused, isEmpty])

    const onTextFieldFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true)
      onFocus?.(event)
    }
    const onTextFieldBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false)
      onBlur?.(event)
    }

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: () => {
          inputRef.current?.clear()
          setIsEmpty(true)
        },
        isFocused: () => inputRef.current?.isFocused() || false,
      }),
      [inputRef]
    )

    return (
      <View style={style}>
        <Text className="mb-2 font-bold text-base">{title}</Text>
        <View
          className="flex-row h-12 border-2 px-2 mb-1 rounded-lg justify-center border-transparent focus:border-sky bg-sky-200 focus:bg-light-ui "
          style={style}>
          <TextInput
            {...textInputProps}
            value={field.value}
            ref={inputRef}
            className="flex-1 text-lg leading-6 text-start"
            style={[inputStyle]}
            onFocus={onTextFieldFocus}
            onBlur={onTextFieldBlur}
            onChangeText={(text) => {
              onChangeText?.(text)
              field.onChange(text)
              setIsEmpty(_.isEmpty(text))
            }}
          />
          {/* Clear button */}
          <View className="justify-center">
            {shouldShowClearButton && (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => {
                  inputRef.current?.clear()
                  setIsEmpty(true)
                }}
                hitSlop={{ left: 8, top: 8, right: 8, bottom: 8 }}>
                <Icon name="close-outline" size={25} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Error message */}
        {Boolean(errorMessage) && <Text className="text-scarlet italic">{errorMessage}</Text>}
      </View>
    )
  }
)

export default TextField
