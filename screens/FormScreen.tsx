import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContactForm from '../components/ContactForm'
import useContactStorage from '../hooks/useContactStorage'
import { ScreenProps } from '../interfaces/ScreenProps'
import Contact from '../models/Contact'

type Props = ScreenProps<'FormScreen'>

export interface FormScreenParams {}

const FormScreen = ({ navigation }: Props) => {
  const { saveContact } = useContactStorage()

  const handleSubmit = (data: Contact) => {
    console.log('[FormScreen][handleSubmit]Form data:', data)
    saveContact(data)
    navigation.goBack()
  }

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 justify-center bg-light-ui mb-3">
      <ContactForm className="w-full" onSubmit={handleSubmit} />
    </SafeAreaView>
  )
}

export default FormScreen
