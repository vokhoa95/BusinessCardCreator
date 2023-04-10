import { NavigationContainer } from '@react-navigation/native'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ExportScreen, { ExportScreenParams } from './screens/ExportScreen'
import FormScreen, { FormScreenParams } from './screens/FormScreen'
import ItemScreen, { ItemScreenParams } from './screens/ItemScreen'
import ListScreen, { ListScreenParams } from './screens/ListScreen'

export type RootStackParamList = {
  ListScreen: ListScreenParams
  FormScreen: FormScreenParams
  ItemScreen: ItemScreenParams
  ExportScreen: ExportScreenParams
}

/** the screens type corresponds to the keyof of the RootStackParamList */
export type Screen = keyof RootStackParamList
/** This type consists of the root navigation object and the route, which contains the params that are associated with the
 * specific screen that is passed in as the generic type. */
export type NavigationStackProps<T extends Screen> = NativeStackScreenProps<RootStackParamList, T>

const RootStack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen options={{ title: 'List Screen' }} name="ListScreen" component={ListScreen} />
        <RootStack.Screen options={{ title: 'Form Screen' }} name="FormScreen" component={FormScreen} />
        <RootStack.Screen options={{ title: 'Item Screen' }} name="ItemScreen" component={ItemScreen} />
        <RootStack.Screen options={{ title: 'Export Screen' }} name="ExportScreen" component={ExportScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App
