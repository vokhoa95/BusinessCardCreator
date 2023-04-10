import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContactCard from '../components/ContactCard'
import TextButton from '../components/TextButton'
import useContactStorage from '../hooks/useContactStorage'
import useFormFactor from '../hooks/useFormFactor'
import { ScreenProps } from '../interfaces/ScreenProps'
import Contact from '../models/Contact'

type ListScreenProps = ScreenProps<'ListScreen'>

const TABLET_NUM_OF_COLUMNS = 4

export interface ListScreenParams {}

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { contacts, getContacts } = useContactStorage()
  const isTablet = useFormFactor() === 'tablet'
  const { width: windowWidth } = useWindowDimensions()

  const [isFocused, setIsFocused] = useState(false)

  const onPressContact = useCallback(
    (contact: Contact) => {
      navigation.navigate('ItemScreen', { contact })
    },
    [navigation]
  )

  // Use useFocusEffect to run getContacts whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (!isFocused) {
        setIsFocused(true)
        return
      }
      getContacts()
    }, [getContacts, isFocused])
  )

  // Calculate the card witdth and margin between cards for tablet view
  const numColumns = isTablet ? TABLET_NUM_OF_COLUMNS : 1
  const cardWidth = (windowWidth - 60) / numColumns
  const margin = (windowWidth - cardWidth * numColumns - 24) / (numColumns - 1)

  const renderContact = ({ item }: { item: Contact }) => {
    return (
      <ContactCard
        className="mb-4"
        style={isTablet && { width: cardWidth, marginEnd: margin }}
        contact={item}
        onPress={onPressContact}
      />
    )
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1 px-3 py-3 justify-center bg-light-ui">
      {contacts.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          className="mb-4"
          data={contacts}
          renderItem={renderContact}
          numColumns={numColumns}
        />
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Contact List is empty</Text>
        </View>
      )}
      <TextButton
        title="Add Business Card"
        onPress={() => {
          navigation.navigate('FormScreen', {})
        }}
      />
    </SafeAreaView>
  )
}

export default ListScreen
