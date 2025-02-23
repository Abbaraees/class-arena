import { Link, Tabs } from 'expo-router';

import { TabBarIcon } from '@components/TabBarIcon';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { useData } from '~/src/providers/DataProvider';

export default function TabLayout() {
  const { toggleDeletingGroup, toggleUpdatingGroup } = useData()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9355ff',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Group',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          headerRight: () => (
            <View className='flex flex-row'>
              <TouchableOpacity onPress={() => {toggleUpdatingGroup(true)}}>
                <FontAwesome name='edit' size={24} color='#333' className='m-4'/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {toggleDeletingGroup(true)}}>
                <FontAwesome name='trash-o' size={24} color='#ff1100' className='m-4'/>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: 'Group Scores',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
        }}
      />
    </Tabs>
  );
}
