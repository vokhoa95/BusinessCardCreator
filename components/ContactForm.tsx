import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, Text, View } from 'react-native'
import Contact, { contactSchema } from '../models/Contact'
import TextButton from './TextButton'
import TextField from './TextField'

interface ContactFormProps extends ScrollViewProps {
  onSubmit(data: Contact): void
  onDelete?(id: string): void
  onExportContact?(): void
  contact?: Contact
}

const ContactForm = ({ onSubmit, onDelete, onExportContact, contact, ...scrollViewProps }: ContactFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Contact>({ mode: 'onBlur', resolver: zodResolver(contactSchema) })

  useEffect(() => {
    // If there is a "contact" prop passed to this component, we will use
    // the "reset" function from useForm to update the form fields with the
    // values from the "contact" object.
    if (contact) {
      console.log(contact)
      reset(contact)
    }
  }, [contact, reset])

  // Using the useForm hook to handle form state and validation using zodResolver
  const submitForm = (data: Contact) => {
    const updatedData = {
      ...data,
      id: contact ? data.id : new Date().getTime().toString(), // generate a random id
    }
    onSubmit?.(updatedData)
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 py-2 px-4"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}>
      <ScrollView {...scrollViewProps} bounces={false} className=" bg-light-ui">
        <Text className="text-3xl font-semibold mb-2">{contact ? 'Edit Contact' : 'Add new Contact'}</Text>
        <View className="mb-6">
          <TextField
            name="name"
            control={control}
            title="Name"
            placeholder="Your Name"
            errorMessage={errors.name?.message as string}
            clearButtonMode="while-editing"
            className="mb-2"
            autoFocus={!contact}
          />
          <TextField
            name="occupation"
            control={control}
            title="Occupation"
            placeholder="Your occupation"
            errorMessage={errors.occupation?.message as string}
            clearButtonMode="while-editing"
            className="mb-2"
          />
          <TextField
            name="company"
            control={control}
            title="Company"
            placeholder="Your company"
            errorMessage={errors.company?.message as string}
            clearButtonMode="while-editing"
            className="mb-2"
          />
          <TextField
            control={control}
            name="email"
            title="Email Address"
            placeholder="Your email address"
            keyboardType="email-address"
            errorMessage={errors.email?.message as string}
            clearButtonMode="while-editing"
            className="mb-2"
          />
          <TextField
            name="phoneNumber"
            control={control}
            title="Phone Number"
            placeholder="Your phone number"
            keyboardType="number-pad"
            errorMessage={errors.phoneNumber?.message as string}
            clearButtonMode="while-editing"
            className="mb-2"
          />
          <TextField
            name="linkedInUrl"
            control={control}
            title="LinkedIn URL(optional)"
            placeholder="Ex: https://www.linkedin.com/in/yourname/"
            errorMessage={errors.linkedInUrl?.message as string}
            clearButtonMode="while-editing"
          />
        </View>
        <TextButton className="mb-4" title={contact ? 'Save Changes' : 'Submit'} onPress={handleSubmit(submitForm)} />
        {onDelete && contact && (
          <TextButton buttonStyle="secondary" className="mb-4" title="Delete" onPress={() => onDelete(contact.id)} />
        )}
        {onExportContact && (
          <TextButton
            buttonStyle="secondary"
            className="mb-4 justify-center items-center"
            title="Export as Phone Contact"
            onPress={onExportContact}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default ContactForm
