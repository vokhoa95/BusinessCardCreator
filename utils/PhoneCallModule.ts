import { Linking, NativeModules, Platform } from 'react-native'

const { PhoneCallModule } = NativeModules

export default {
  makePhoneCall: (phoneNumber: string) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`tel:${phoneNumber}`)
    } else if (Platform.OS === 'android') {
      PhoneCallModule.makePhoneCall(phoneNumber)
    }
  },
}
