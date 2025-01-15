import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useData } from '~/src/providers/DataProvider';
import { Leaderboard } from '~/src/types';


export default function Home() {
  const {leaderboard, computeLeaderBoard, scores, groups} = useData()
  const renderPosition = ({ item }: {item: Leaderboard}) => {
    return (
      <View className='w-full flex flex-row items-center gap-2 bg-white p-4 rounded-lg shadow mb-3'>
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

  return (
    <View style={styles.container}>
      {leaderboard.length > 0 ?
      <FlatList
        data={leaderboard}
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
