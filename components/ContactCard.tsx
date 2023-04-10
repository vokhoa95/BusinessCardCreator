import React from 'react'
import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import useRandomGradient from '../hooks/useRandomGradient'
import Contact from '../models/Contact'

interface Props extends ViewProps {
  contact: Contact
  onPress(contact: Contact): void
}

const ContactCard = ({ contact, onPress, ...viewProps }: Props) => {
  const gradient = useRandomGradient()

  return (
    <TouchableOpacity className="shadow  bg-light-ui rounded-xl" {...viewProps} onPress={() => onPress(contact)}>
      <LinearGradient
        colors={[gradient.start, gradient.end]}
        className=" px-2.5 py-4 border border-gray-400 rounded-xl">
        <View className="flex-1 ml-2.5 rounded-xl h-full">
          <Text className="flex-1 text-2xl font-bold">{contact.name}</Text>
          <Text className="flex-1 text-lg mb-2">{`${contact.occupation} at ${contact.company}`}</Text>
          <Text className="flex-1 text-base">{contact.email}</Text>
          <Text className="flex-1 text-base">{contact.phoneNumber}</Text>
          <Text className="flex-1 text-base underline">{contact.linkedInUrl}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default React.memo(ContactCard)
