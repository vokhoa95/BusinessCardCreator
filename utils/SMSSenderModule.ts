import { Alert, Linking, NativeModules, PermissionsAndroid, Platform } from 'react-native'

const { SMSSenderModule } = NativeModules

const sendSMSAndroid = async (phoneNumber: string, message: string) => {
  const sendSMSPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS, {
    title: 'Contacts',
    message: 'This app would like to send messages.',
    buttonPositive: 'Allow',
  })
  if (sendSMSPermission !== PermissionsAndroid.RESULTS.GRANTED) {
    Alert.alert('Permission Denied', 'Unable to send SMS as permission has been denied.')
    return
  }
  SMSSenderModule.sendSMS(phoneNumber, message)
}

const sendSMSiOS = async (phoneNumber: string, message: string) => {
  const canSendText = await Linking.canOpenURL(`sms:${phoneNumber}`)
  if (!canSendText) {
    Alert.alert('Error', 'Unable to send SMS. Please check if your device supports SMS functionality.')
    return
  }
  Linking.openURL(`sms:${phoneNumber}&body=${message}`)
}

export default {
  sendSMS: async (phoneNumber: string, message?: string) => {
    if (Platform.OS === 'ios') {
      sendSMSiOS(phoneNumber, message || '')
    } else {
      sendSMSAndroid(phoneNumber, message || '')
    }
  },
}
