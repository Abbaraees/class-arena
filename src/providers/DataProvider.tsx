import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Group, Leaderboard, Member, Score } from "../types";


type DataContextType = {
  members: Member[],
  groups: Group[],
  leaderboard: Leaderboard[],
  scores: Score[],
  addGroup: (name: string) => void,
  addMember: (name: string, groupId: number) => void,
  getGroupMembers: (groupId: number) => Member[],
  getGroupScores: (groupId: number) => Score[],
  addScore: (groupId: number, score: number, subject: string) => void,
  getGroup: (groupId: number) => Group | undefined,
  getMembersCount: (groupId: number) => number,
  getTotalScores: (groupId: number) => number,
  currentGroup: Group | null,
  setCurrentGroup: (group: Group | null) => void,
  computeLeaderBoard: () => void,
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
  getTotalScores: (groupId: number) => 0,
  currentGroup: null,
  setCurrentGroup: (group: Group | null) => {},
  computeLeaderBoard: () => {},
})


export default function DataProvider({ children }: PropsWithChildren) {

  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [leaderboard, setLeaderBoard] = useState<Leaderboard[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const [currentGroup, setCurrentGroup] = useState<Group|null>(null)

  const addGroup = (name: string) => {
    setGroups(prev => [...prev, {id: groups.length + 1, name, members: 0, score: 0}])
  }
  
  const addMember = (name: string, groupId: number) => {
    const newMember: Member = {id: members.length + 1, name, groupId}
    setMembers(prev => [...prev, newMember])

  }

  const addScore = (groupId: number, score: number, subject: string) => {
    const newScore = {groupId, score, subject, id: scores.length + 1}
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

  const computeLeaderBoard = () => {
     // Step 1: Map groups to calculate total scores
    let leaderBoard = groups.map(group => ({
      groupName: group.name,
      totalScore: getTotalScores(group.id),
      position: 0 // Position will be calculated after sorting
    }));

    // Step 2: Sort the leaderboard by totalScore in descending order
    leaderBoard = leaderBoard.sort((a, b) => b.totalScore - a.totalScore);

    // Step 3: Assign positions considering ties
    let currentRank = 1;
    leaderBoard.forEach((group, index) => {
      if (index > 0 && group.totalScore === leaderBoard[index - 1].totalScore) {
        group.position = leaderBoard[index - 1].position; // Same position as the previous group
      } else {
        group.position = currentRank;
      }
      currentRank++;
    });

    setLeaderBoard(leaderBoard);
  }

  return (
    <DataContext.Provider value={{
      members, groups, leaderboard, scores, 
      addGroup, addMember, addScore, getGroupMembers, 
      getGroupScores, getGroup, getMembersCount, getTotalScores,
      currentGroup, setCurrentGroup, computeLeaderBoard
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)