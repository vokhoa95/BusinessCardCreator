import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'
import Contact from '../models/Contact'

const useContactStorage = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  const updateContactDatabase = async (updatedContacts: Contact[]) => {
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts))
    setContacts(updatedContacts)
  }

  const saveContact = async (contact: Contact) => {
    const updatedContacts = [...contacts, contact]
    await updateContactDatabase(updatedContacts)
  }

  const getContacts = useCallback(async () => {
    const jsonValue = await AsyncStorage.getItem('contacts')
    if (jsonValue !== null) {
      const parsedContacts = JSON.parse(jsonValue)
      const sortedContacts = parsedContacts.sort((a: Contact, b: Contact) => a.name === b.name)
      setContacts(sortedContacts)
    }
  }, [])

  const updateContact = async (updatedContact: Contact) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === updatedContact.id) {
        return updatedContact
      }
      return contact
    })
    await updateContactDatabase(updatedContacts)
  }

  const deleteContact = async (contactId: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId)
    await updateContactDatabase(updatedContacts)
  }

  useEffect(() => {
    getContacts()
  }, [getContacts])

  return { contacts, saveContact, getContacts, updateContact, deleteContact }
}

export default useContactStorage
