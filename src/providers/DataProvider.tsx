import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Group, Member, Score } from "../types";


type DataContextType = {
  members: Member[],
  groups: Group[],
  leaderboard: any,
  scores: Score[],
  addGroup: (name: string) => void,
  addMember: (name: string, groupId: number) => void,
  getGroupMembers: (groupId: number) => Member[],
  getGroupScores: (groupId: number) => Score[],
  addScore: (groupId: number, score: number, subject: string) => void,
  getGroup: (groupId: number) => Group | undefined,
  getMembersCount: (groupId: number) => number,
  getTotalScores: (groupId: number) => number,
}

const DataContext = createContext<DataContextType>({
  members: [],
  groups: [],
  leaderboard: [],
  scores: [],
  addGroup: (name: string) => {},
  addMember: (name: string, groupId: number) => {},
  getGroupMembers: (groupId: number) => [],
  getGroupScores: (groupId: number) => [],
  addScore: (groupId: number, score: number, subject: string) => {},
  getGroup: (groupId: number) => undefined,
  getMembersCount: (groupId: number) => 0,
  getTotalScores: (groupId: number) => 0

})


export default function DataProvider({ children }: PropsWithChildren) {

  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [leaderboard, setLeaderBoard] = useState([])
  const [scores, setScores] = useState<Score[]>([])

  const addGroup = (name: string) => {
    setGroups(prev => [...prev, {id: groups.length + 1, name, members: 0, score: 0}])
  }
  
  const addMember = (name: string, groupId: number) => {
    const newMember: Member = {id: members.length + 1, name, groupId}
    setMembers(prev => [...prev, newMember])

  }

  const addScore = (groupId: number, score: number, subject: string) => {
    const newScore = {groupId, score, subject}
    setScores(prev => [...prev, newScore])
  }
  const getGroupMembers = (groupId: number) => {
    return members.filter(member => member.groupId == groupId)
  }
  const getGroupScores = (groupId: number) => {
    return scores.filter(score => score.groupId == groupId)
  }

  const getGroup = (groupId: number) => {
    return groups.find(group => group.id == groupId)
  }

  const getMembersCount = (groupId: number) => {
    return members.filter(member => member.groupId === groupId).length
  }

  const getTotalScores = (groupId: number) => {
    let total = 0
    
    scores
      .filter(score => score.groupId === groupId)
      .map(score => {total += score.score})

    return total
      
  }

  return (
    <DataContext.Provider value={{members, groups, leaderboard, scores, addGroup, addMember, addScore, getGroupMembers, getGroupScores, getGroup, getMembersCount, getTotalScores}}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)