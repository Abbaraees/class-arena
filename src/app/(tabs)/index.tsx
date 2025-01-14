import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Button, FAB, Modal, Portal, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AddEntityModal from '~/src/components/AddEntityModal';
 

type Group = {
  id: number;
  name: string;
  score: number;
  members: number;
}

const HomeScreen = () => {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', score: 350, members: 4 },
    { id: 2, name: 'Group 2', score: 300, members: 4 },
    { id: 3, name: 'Group 3', score: 289, members: 4 },
  ])

  const renderGroup = ({ item }: {item: Group}) => (
    <TouchableOpacity className="bg-white p-4 rounded-lg shadow mb-4" onPress={() => handleGroupPress(item.id)}>
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-sm text-gray-500">Total Score: {item.score}</Text>
      <Text className="text-sm text-gray-500">Members: {item.members}</Text>
    </TouchableOpacity>
  );

  const handleGroupPress = (id: number) => {
    // Navigate to Group Details Screen
    router.push(`/groups/${id}`)
  };

  const handleAddGroup = () => {
    console.log('Add Group Pressed');
    const newGroup = { id: groups.length + 1, name: groupName, score: 0, members: 0 }
    setGroups([...groups, newGroup])
    setGroupName('')
    setIsAdding(false)
  };

  const handleCancelAddGroup = () => {
    setIsAdding(false)
    setGroupName('')
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <FAB
        className="absolute bottom-2 right-2 bg-purple-600 rounded-full shadow-lg"
        onPress={() => setIsAdding(true)}
        icon={'plus'}
        color='white'
      />
   
      {isAdding && 
        <AddEntityModal 
          title='Group' 
          entityName={groupName}
          onNameChange={setGroupName}
          handleAdd={handleAddGroup}
          handleCancel={handleCancelAddGroup}
        />
      }
    </View>
  );
};

export default HomeScreen;
