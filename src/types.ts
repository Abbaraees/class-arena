export type Group = {
  id: number;
  name: string;
  score: number;
  members: number;
}

export type Member = {
  id?: number,
  groupId: number,
  name: string,
  warning: boolean
}

export type Score = {
  id?: number,
  groupId: number,
  subject: string,
  score: number,
}

export type Leaderboard = {
  groupName: string,
  totalScore: number,
  position: number
}