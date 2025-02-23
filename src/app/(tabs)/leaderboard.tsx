import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { useData } from '~/src/providers/DataProvider';
import { Leaderboard } from '~/src/types';


export default function Home() {
  const {leaderboard, computeLeaderBoard, scores, groups} = useData()
  const [search, setSearch] = useState('')
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(leaderboard)

  const renderPosition = ({ item }: {item: Leaderboard}) => {
    return (
      <View className={`w-full flex flex-row items-center gap-2 ${item.totalScore >= 40 ?`bg-white` : 'bg-red-400'} p-4 rounded-lg shadow mb-3 border-gray-300 border`}>
        <Avatar.Text label={`${item.position}`} size={48}/>
        <View>
          <Text className='text-lg'>
            {item.groupName}
          </Text>
          <Text className='text-lg text-gray-800'>
            Total Scores: {item.totalScore}
          </Text>
        </View>
      </View>
    )
  }
  

  useFocusEffect(useCallback(() => {
    computeLeaderBoard()
  }, [scores, groups]))

  useEffect(() => {
    if (search) {
      setFilteredLeaderboard(leaderboard.filter(entry => entry.groupName.toLowerCase().includes(search.toLowerCase())))
    }
    else {
      setFilteredLeaderboard(leaderboard)
    }

  }, [search, leaderboard])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter Group Name....'
        mode='outlined'
        style={{marginBottom: 10, width: '80%', marginLeft: 'auto'}}
        onChangeText={setSearch}
        
      />
      {leaderboard.length > 0 ?
      <FlatList
        data={filteredLeaderboard}
        renderItem={renderPosition}
        contentContainerStyle={{paddingBottom: 100}}
      />
      : <Text className='text-lg text-purple-600 text-center my-auto'>No Scores added yet, Add some scores to view the leaderboard</Text>
      }
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
