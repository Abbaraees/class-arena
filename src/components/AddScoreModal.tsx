import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, Button, TextInput} from 'react-native-paper'


type AddScoreModalPropsType = {
  onNameChange: (name: string) => void,
  onScoreChange: (score: string) => void,
  handleAdd: () => void,
  handleCancel: () => void,
  isUpdate?: boolean,
  subject?: string,
  score?: string
}

const AddScoreModal = ({onNameChange, handleAdd, handleCancel, onScoreChange, isUpdate, subject, score}: AddScoreModalPropsType) => {
  return (
    <Portal>
      <Modal visible>
        <View className='w-100 bg-white rounded-md items-center, justify-center p-8 m-4'>
          <Text className='text-xl font-bold mb-4'>{isUpdate ? 'Update Score' : `Add New Score`}</Text>
          <TextInput
            placeholder={`Enter subject name`}
            label={`Subject Name`}
            mode='outlined'
            value={subject}
            onChangeText={onNameChange}
          />
          { score ? 
            <TextInput
              value={score}
              placeholder={`Enter Score`}
              label={`Score`}
              mode='outlined'
              onChangeText={onScoreChange}
              keyboardType='numeric'
              style={{marginTop: 8}}
            />
          :
            <TextInput
              placeholder={`Enter Score`}
              label={`Score`}
              mode='outlined'
              onChangeText={onScoreChange}
              keyboardType='numeric'
              style={{marginTop: 8}}
            />
          }
          <Button
            mode='contained'
            onPress={handleAdd}
            className='mt-4'
          >
            <Text>{isUpdate ? 'Update Score' : 'Add Score'}</Text>
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