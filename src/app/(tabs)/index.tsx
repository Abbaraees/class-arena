import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FAB, TextInput } from 'react-native-paper';
import AddEntityModal from '~/src/components/AddEntityModal';
import { useData } from '~/src/providers/DataProvider';
import { Group } from '~/src/types';
 

const HomeScreen = () => {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const [groupName, setGroupName] = useState('')
  const { groups, addGroup, getMembersCount, getTotalScores } = useData()
  const [search, setSearch] = useState('')
  const [filteredGroups, setFilteredGroups] = useState(groups)

  const renderGroup = ({ item }: {item: Group}) => (
    <TouchableOpacity className="bg-white p-4 rounded-lg shadow mb-4" onPress={() => handleGroupPress(item.id)}>
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-sm text-gray-500">Total Score: {getTotalScores(item.id)}</Text>
      <Text className="text-sm text-gray-500">Members: {getMembersCount(item.id)}</Text>
    </TouchableOpacity>
  );

  const handleGroupPress = (id: number) => {
    // Navigate to Group Details Screen
    router.push(`/groups/${id}`)
  };

  const handleAddGroup = () => {
    addGroup(groupName)
    setGroupName('')
    setIsAdding(false)
  };

  const handleCancelAddGroup = () => {
    setIsAdding(false)
    setGroupName('')
  }

  useEffect(() => {
    if (search) {
      setFilteredGroups(groups.filter(group => group.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
    }
    else {
      setFilteredGroups(groups)
    }
  }, [search, groups])

  return (
    <View className="flex-1 bg-gray-100 px-4 py-2">
      <TextInput
        placeholder='Enter Group Name....'
        mode='outlined'
        style={{marginBottom: 10, width: '80%', marginLeft: 'auto'}}
        onChangeText={setSearch}
        
      />
      {groups.length > 0 
      ?
        <FlatList
          data={filteredGroups}
          renderItem={renderGroup}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      : <Text className='text-lg text-purple-700 my-auto text-center'>No Group added yet, Add new group to get started!</Text>
      }
      <FAB
        className="absolute bottom-2 right-2 bg-purple-600 rounded-full shadow-lg"
        onPress={() => setIsAdding(true)}
        icon={'plus'}
        color='white'
      />
   
      {isAdding && 
        <AddEntityModal 
          title='Group' 
          onNameChange={setGroupName}
          handleAdd={handleAddGroup}
          handleCancel={handleCancelAddGroup}
        />
      }
    </View>
  );
};

export default HomeScreen;
