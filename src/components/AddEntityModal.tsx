import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, Button, TextInput} from 'react-native-paper'


type AddEntityModalPropsType = {
  title: string,
  entityName: string,
  onNameChange: (name: string) => void,
  handleAdd: () => void,
  handleCancel: () => void
}

const AddEntityModal = ({title, entityName, onNameChange, handleAdd, handleCancel}: AddEntityModalPropsType) => {
  const [name, setName] = useState('')
  return (
    <Portal>
      <Modal visible>
        <View className='w-100 bg-white rounded-md items-center, justify-center p-8 m-4'>
          <Text className='text-xl font-bold mb-4'>{`Add New ${title}`}</Text>
          <TextInput
            placeholder={`Enter ${title} name`}
            label={`${title} Name`}
            mode='outlined'
            // value={name}
            onChangeText={onNameChange}
          />
          <Button
            mode='contained'
            onPress={handleAdd}
            className='mt-4'
          >
            <Text>Add {title}</Text>
          </Button>
          <Button
            mode='outlined'
            onPress={handleCancel}
            className='mt-2'
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default AddEntityModal