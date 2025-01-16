import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Avatar, FAB, Modal, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddEntityModal from '~/src/components/AddEntityModal';
import { Group, Member, Score } from '~/src/types';
import { useData } from '~/src/providers/DataProvider';
import AddScoreModal from '~/src/components/AddScoreModal';


const Scores = () => {
  const router = useRouter()
  const { id } = useGlobalSearchParams()
  const groupId = typeof id == 'string' ? parseInt(id) : parseInt(id[0])

  const [group, setGroup] = useState<Group|null>()
  const [isAdding, setIsAdding] = useState(false)
  const [subject, setSubject] = useState('')
  const [score, setScore] = useState(0)
  const [scores, setScores] = useState<Score[]>([])

  const { getGroup, addScore, setCurrentGroup, scores: scoredDB } = useData()

  useEffect(() => {
    const group = getGroup(groupId)
    setGroup(group ? group : null)
    setScores(group ? scoredDB.filter(score => score.groupId === groupId) : [])
    setCurrentGroup(group ? group : null)
  }, [groupId, isAdding, scoredDB])

  
  const renderMember = ({ item }: {item: Score}) => (
    <View className="bg-white p-2 rounded-xl shadow-md mb-4 gap-1" >
      <Text className="text-2xl font-semibold text-gray-800">{item.subject}</Text>
      <Text className="text-2xl text-gray-600">{item.score}</Text>
    </View>
  );

  const handleCompetitionPress = (id: number) => {
    console.log(`Competition ${id} pressed`);
    // Navigate to Competition Details Screen
    router.push(`/groups/${id}`)
  };

  const handleAddScore = () => {
    // Navigate to Add/Edit Competition Screen
    addScore(groupId, score, subject)
    handleCancelAddScore()

  };

  const handleCancelAddScore = () => {
    setIsAdding(false)
    setSubject('')
    setScore(0)
  }

  return (
    <>
      {
        group === undefined
        ? <Portal>
            <Modal visible>
              <ActivityIndicator />
            </Modal>
          </Portal>
        : group === null
        ? <Text className='text-lg text-red-500 text-center font-semibold my-auto'>No Group Found with the given ID</Text>
        :<>
        <Stack.Screen options={{title: `${group.name} Scores`}} />
        <View className="flex-1 bg-gray-100 p-4">
          {scores.length > 0
          ?
            <FlatList
            data={scores}
            renderItem={renderMember}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          :
            <Text className='text-lg text-purple-500 text-center my-auto font-semibold'>No Scores added to this group yet, Add some scores to get started</Text>
          }
          
          <FAB
            className="absolute bottom-2 right-2 bg-purple-600 rounded-full shadow-lg"
            onPress={() => setIsAdding(true)}
            icon={'plus'}
            color='white'
          />
          {isAdding && 
            <AddScoreModal
              handleCancel={handleCancelAddScore}
              handleAdd={handleAddScore}
              onNameChange={setSubject}
              onScoreChange={(score) => setScore(parseFloat(score))}
            />
          }
        </View>
      </>
      }
      
    </>
  );
};

export default Scores;