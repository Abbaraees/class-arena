import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Group, Leaderboard, Member, Score } from "../types";
import * as SQLite from "expo-sqlite"
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { groups as groupsTable, scores as scoresTable, members as membersTable } from '../db/schema'
import { eq } from "drizzle-orm";


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
  isUpdatingGroup: boolean,
  isDeletingGroup: boolean,
  toggleUpdatingGroup: (state: boolean) => void,
  toggleDeletingGroup: (state: boolean) => void,
  deleteGroup: (groupId: number) => void,
  updateGroup: (groupId: number, name: string) => void,
  updateMember: (memberId: number, name: string, warning: boolean) => void,
  deleteMember: (groupId: number) => void,
  updateScore: (scoreId: number, subject: string, score: number) => void,
  deleteScore: (scoreId: number) => void,
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
  isUpdatingGroup: false,
  isDeletingGroup: false,
  toggleUpdatingGroup: (state: boolean) => {},
  toggleDeletingGroup: (state: boolean) => {},
  deleteGroup: (groupId: number) => {},
  updateGroup: (groupId: number, name: string) => {},
  updateMember: (groupId: number, name: string, warning: boolean) => {},
  deleteMember: (groupId: number) => {},
  updateScore: (scoreId: number, subject: string, score: number) => {},
  deleteScore: (scoreId: number) => {},
})

const expo = SQLite.openDatabaseSync("classArena.db")
export const db = drizzle(expo)


export default function DataProvider({ children }: PropsWithChildren) {

  useEffect(() => {
      initData()
  }, [])

  const initData = () => {
    loadScores()
    loadMembers()
    loadGroups()
  }

  const [members, setMembers] = useState<Member[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [leaderboard, setLeaderBoard] = useState<Leaderboard[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const [currentGroup, setCurrentGroup] = useState<Group|null>(null)
  const [isUpdatingGroup, toggleUpdatingGroup] = useState(false)
  const [isDeletingGroup, toggleDeletingGroup] = useState(false)

  const loadGroups = async () => {
    const groups = await db.select().from(groupsTable)
    const groupsFormated: Group[] = groups?.map(group => (
      {...group, score: getTotalScores(group.id), members: getMembersCount(group.id)}
    ))
    setGroups(groupsFormated)
  }
  const loadMembers = async () => {
    const members = await db.select().from(membersTable)
    setMembers(members)
  }
  const loadScores = async () => {
    const scores = await db.select().from(scoresTable)
    setScores(scores)
  }

  const addGroup = async (name: string) => {
    try {
      await db.insert(groupsTable).values({name})
      console.log("Added")
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadGroups()
  }


  const deleteGroup = async (groupId?: number) => {
    try {
      groupId && await db.delete(groupsTable).where(eq(groupsTable.id, groupId))
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadGroups()
  }

  const updateGroup = async (groupId: number, name: string) => {
    try {
       const updatedGroup = await db.update(groupsTable).set({name}).where(eq(groupsTable.id, groupId)).returning()
       currentGroup && setCurrentGroup({...currentGroup, name: updatedGroup[0].name})
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadGroups()
    
  }
  
  const addMember = async (name: string, groupId: number) => {
    await db.insert(membersTable).values({
      name,
      groupId,
      warning: false
    })
    loadMembers()

  }

  const updateMember = async (memberId: number, name: string, warning?: boolean) => {
    try {
      await db.update(membersTable).set({name, warning}).where(eq(membersTable.id, memberId))
   } catch (error) {
     console.log("Failed: ", error)
   }
   loadMembers()
  }

  const deleteMember = async (memberId?: number) => {
    try {
      memberId && await db.delete(membersTable).where(eq(membersTable.id, memberId))
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadMembers()
  }

  const addScore = async (groupId: number, score: number, subject: string) => {
    await db.insert(scoresTable).values({
      subject,
      groupId,
      score
    })
    loadScores()
  }

  const updateScore = async (scoreId: number, subject: string, score: number) => {
    try {
      await db.update(scoresTable).set({score, subject}).where(eq(scoresTable.id, scoreId))
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadScores()
  }

  const deleteScore = async (scoreId?: number) => {
    try {
      scoreId && await db.delete(scoresTable).where(eq(scoresTable.id, scoreId))
    } catch (error) {
      console.log("Failed: ", error)
    }
    loadScores()
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
      currentGroup, setCurrentGroup, computeLeaderBoard,
      isDeletingGroup, isUpdatingGroup, toggleDeletingGroup, 
      toggleUpdatingGroup, deleteGroup, updateGroup, updateMember,
      deleteMember, updateScore, deleteScore
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)