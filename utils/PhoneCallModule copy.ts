import { NativeModules } from 'react-native'

const { PhoneCallModule } = NativeModules

export default {
  makePhoneCall: (phoneNumber: string) => {
    PhoneCallModule.makePhoneCall(phoneNumber)
  },
}
