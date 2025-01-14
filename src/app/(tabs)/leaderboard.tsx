import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';


export default function Home() {
  const renderPosition = () => {
    return (
      <View className='w-full flex flex-row items-center gap-1 bg-white p-4 rounded-lg shadow mb-3'>
        <Avatar.Text label='1' size={48}/>
        <View>
          <Text className='text-lg'>
            Group 1
          </Text>
          <Text className='text-lg text-gray-800'>
            400
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={Array(9).fill(NaN)}
        renderItem={renderPosition}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
