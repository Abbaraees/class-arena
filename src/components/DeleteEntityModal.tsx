import React from 'react'
import { View, Text } from 'react-native'
import { Modal, Portal, Button } from 'react-native-paper'


type DeleteEntityModalPropsType = {
  onAccept: () => void,
  onReject: () => void,
  entityName: string
}

function DeleteEntityModal({ onAccept, onReject, entityName}: DeleteEntityModalPropsType) {
  return (
    <Portal>
      <Modal visible>
        <View className='w-3/4 mx-auto p-4 bg-white rounded-md'>
          <Text className='text-lg font-semibold text-center'>Are you sure you want to delete: {entityName}</Text>
          <View className='flex flex-row justify-between '>
            <Button 
              mode='contained'  
              className='w-1/3'
              onPress={onAccept}
            >
              Yes
            </Button>
            <Button 
              mode='outlined' 
              className='w-1/3'
              onPress={onReject}
            >
              No
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

export default DeleteEntityModal