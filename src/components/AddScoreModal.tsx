import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, Button, TextInput} from 'react-native-paper'


type AddScoreModalPropsType = {
  onNameChange: (name: string) => void,
  onScoreChange: (score: string) => void,
  handleAdd: () => void,
  handleCancel: () => void
}

const AddScoreModal = ({onNameChange, handleAdd, handleCancel, onScoreChange}: AddScoreModalPropsType) => {
  const [name, setName] = useState('')
  return (
    <Portal>
      <Modal visible>
        <View className='w-100 bg-white rounded-md items-center, justify-center p-8 m-4'>
          <Text className='text-xl font-bold mb-4'>{`Add New Score`}</Text>
          <TextInput
            placeholder={`Enter subject name`}
            label={`Subject Name`}
            mode='outlined'
            // value={name}
            onChangeText={onNameChange}
          />
          <TextInput
            placeholder={`Enter Score`}
            label={`Score`}
            mode='outlined'
            // value={name}
            onChangeText={onScoreChange}
            keyboardType='numeric'
            style={{marginTop: 8}}
          />
          <Button
            mode='contained'
            onPress={handleAdd}
            className='mt-4'
          >
            <Text>Add Score</Text>
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

export default AddScoreModal