import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Avatar } from 'react-native-paper';
 

const competitions = [
  { id: '1', name: 'Muhammad Lawal' },
  { id: '2', name: 'Ibrahim Mustapha' },
  { id: '3', name: 'Adamu Murtala' },
];

const Group = () => {
  const router = useRouter()
  const renderMember = ({ item }) => (
    <TouchableOpacity className="bg-white p-2 rounded-lg shadow mb-4 flex flex-row gap-1 items-center" onPress={() => handleCompetitionPress(item.id)}>
      <Avatar.Text label={item.name[0]} size={48}/>
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
    </TouchableOpacity>
  );

  const handleCompetitionPress = (id) => {
    console.log(`Competition ${id} pressed`);
    // Navigate to Competition Details Screen
    router.push(`/groups/${id}`)
  };

  const handleAddCompetition = () => {
    console.log('Add Competition Pressed');
    // Navigate to Add/Edit Competition Screen
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <FlatList
        data={competitions}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity
        className="absolute bottom-8 right-8 bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={handleAddCompetition}
      >
        <FontAwesome name='plus-circle' size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Group;
