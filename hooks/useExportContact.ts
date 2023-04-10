import { Alert, PermissionsAndroid, Platform } from 'react-native'
import Contacts from 'react-native-contacts'
import Contact from '../models/Contact'

const useExportContact = () => {
  const exportContact = async (data: Contact) => {
    if (Platform.OS === 'android') {
      const readContactsPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to access your contacts.',
        buttonPositive: 'Allow',
      })

      const writeContactsPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to modify your contacts.',
        buttonPositive: 'Allow',
      })

      if (
        writeContactsPermission !== PermissionsAndroid.RESULTS.GRANTED ||
        readContactsPermission !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Permission denied')
        return
      }
    }
    const contactToAdd = {
      givenName: data.name,
      phoneNumbers: [
        {
          label: 'mobile',
          number: data.phoneNumber,
        },
      ],
      emailAddresses: [
        {
          label: 'work',
          email: data.email,
        },
      ],
      jobTitle: data.occupation,
      company: data.company,
      imAddresses: [
        {
          service: 'linkedin',
          username: data.linkedInUrl || '',
        },
      ],
    }
    Contacts.addContact(contactToAdd)
      .then(() => {
        Alert.alert('Contact added successfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return exportContact
}

export default useExportContact
