import React from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContactForm from '../components/ContactForm'
import useContactStorage from '../hooks/useContactStorage'
import { ScreenProps } from '../interfaces/ScreenProps'
import Contact from '../models/Contact'

export interface ItemScreenParams {
  contact: Contact
}

type Props = ScreenProps<'ItemScreen'>

const ItemScreen = ({ route, navigation }: Props) => {
  const { contact } = route.params
  const { updateContact, deleteContact } = useContactStorage()

  const handleSubmit = (data: Contact) => {
    console.log('[ItemScreen][handleSubmit]Form data:', data)
    updateContact(data)
    navigation.goBack()
  }

  const handleDelete = (id: string) => {
    console.log('[ItemScreen][handleDelete]Delete contact with id:', id)
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this contact? This action cannot be undone.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Continue',
        onPress: () => {
          deleteContact(id)
          navigation.goBack()
        },
        style: 'destructive',
      },
    ])
  }

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 pt-3 justify-center bg-light-ui mb-3">
      <ContactForm
        contact={contact}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onExportContact={() => {
          navigation.navigate('ExportScreen', { contact })
        }}
      />
    </SafeAreaView>
  )
}

export default ItemScreen
