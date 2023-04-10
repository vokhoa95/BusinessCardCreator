import React, { useCallback, useState } from 'react'
import { Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextButton from '../components/TextButton'
import useExportContact from '../hooks/useExportContact'
import { ScreenProps } from '../interfaces/ScreenProps'
import Contact from '../models/Contact'
import PhoneCallModule from '../utils/PhoneCallModule'
import SMSSenderModule from '../utils/SMSSenderModule'

export interface ExportScreenParams {
  contact: Contact
}

type Props = ScreenProps<'ExportScreen'>

const ExportScreen = ({ route }: Props) => {
  const { contact } = route.params
  const exportContact = useExportContact()

  const [smsText, setSmsText] = useState<string>()

  const callPhoneNumber = useCallback(() => {
    PhoneCallModule.makePhoneCall(contact.phoneNumber)
  }, [contact.phoneNumber])

  const sendSMS = useCallback(
    (message: string | undefined) => {
      SMSSenderModule.sendSMS(contact.phoneNumber, message)
    },
    [contact.phoneNumber]
  )

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 py-2 px-4 justify-start bg-light-ui mb-3">
      <Text className="text-3xl font-semibold mb-5">Export Contact</Text>
      <Text className="text-2xl font-medium">{contact.name}</Text>
      <Text className="text-base mb-5">{`Phone number: ${contact.phoneNumber}`}</Text>
      <TextButton
        title="Export to phone contact"
        className="py-2 mb-2"
        buttonStyle="secondary"
        onPress={() => exportContact(contact)}
      />
      <TextButton title="Call this number" className="py-2 mb-2  " buttonStyle="secondary" onPress={callPhoneNumber} />
      <TextInput
        className="h-40 mb-2 border border-gray-300 rounded-md p-2"
        multiline={true}
        placeholder="SMS message"
        onChangeText={(text) => setSmsText(text)}
        value={smsText}
      />
      <TextButton
        title="Send SMS"
        className="py-2 mb-2"
        buttonStyle="secondary"
        onPress={() => {
          sendSMS(smsText)
        }}
      />
    </SafeAreaView>
  )
}

export default ExportScreen
