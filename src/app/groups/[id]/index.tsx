import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Avatar, Button, FAB, Modal, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddEntityModal from '~/src/components/AddEntityModal';
import { Group, Member } from '~/src/types';
import { useData } from '~/src/providers/DataProvider';
import DeleteEntityModal from '~/src/components/DeleteEntityModal';


const GroupDetails = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const groupId = typeof id == 'string' ? parseInt(id) : parseInt(id[0])

  const [group, setGroup] = useState<Group|null>()
  const [isAdding, setIsAdding] = useState(false)
  const [memberName, setMemberName] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [groupName, setGroupName] = useState('')

  const { 
    getGroup, addMember, setCurrentGroup, members: membersDB, 
    isDeletingGroup, isUpdatingGroup, toggleDeletingGroup, 
    toggleUpdatingGroup, deleteGroup, updateGroup, currentGroup } = useData()

  useEffect(() => {
    const group = getGroup(groupId)
    setGroup(group ? group : null)
    setMembers(group ? membersDB.filter(member => member.groupId === groupId) : [])
    setCurrentGroup(group ? group : null)
  }, [groupId, isAdding, membersDB, isUpdatingGroup])

  
  const renderMember = ({ item }: {item: Member}) => (
    <View className="bg-white p-2 rounded-xl shadow-md mb-4 flex flex-row gap-1 items-center" >
      <Avatar.Text label={item.name[0]} size={48}/>
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      {/* <View className='ml-auto flex flex-row gap-4'>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name='pencil' size={28} color={'darkgray'} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name='delete-outline' size={28} color={'red'} />
        </TouchableOpacity>
      </View> */}
    </View>
  );

  const handleAddMember = () => {
    // Navigate to Add/Edit Competition Screen
    addMember(memberName, groupId)
    handleCancelAddMember()

  };

  const handleCancelAddMember = () => {
    setIsAdding(false)
    setMemberName('')
  }

  const handleDeleteGroup = () => {
    group && deleteGroup(group.id)
    toggleDeletingGroup(false)
    router.back()
  }

  const handleUpdateGroup = () => {
    if (group) {
      updateGroup(group.id, groupName)
    }

    setGroupName('')
    toggleUpdatingGroup(false)
  }

  const handleCancelUpdate = () => {
    toggleUpdatingGroup(false)
    group && setGroupName(group?.name)
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
        <Stack.Screen options={{title: currentGroup?.name}} />
        <View className="flex-1 bg-gray-100 p-4">
          {members.length > 0
          ?
            <FlatList
            data={members}
            renderItem={renderMember}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          :
            <Text className='text-lg text-purple-500 text-center my-auto font-semibold'>No Members added to this group yet, Add members to get started</Text>
          }
          
          <FAB
            className="absolute bottom-2 right-2 bg-purple-600 rounded-full shadow-lg"
            onPress={() => setIsAdding(true)}
            icon={'plus'}
            color='white'
          />
          {isAdding && 
            <AddEntityModal
              title='Member'
              handleCancel={handleCancelAddMember}
              handleAdd={handleAddMember}
              onNameChange={setMemberName}
            />
          }
          { isUpdatingGroup && 
            <AddEntityModal
              title='Group'
              handleCancel={handleCancelUpdate}
              handleAdd={handleUpdateGroup}
              onNameChange={setGroupName}
              isUpdate
            />
          }
          { isDeletingGroup && 
            <DeleteEntityModal
              onAccept={handleDeleteGroup}
              onReject={() => toggleDeletingGroup(false)}
              entityName={group.name}
            />
          }
        </View>
      </>
      }
      
    </>
  );
};

export default GroupDetails;
