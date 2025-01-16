import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const groups = sqliteTable("groups", {
  id: int().primaryKey({autoIncrement: true}),
  name: text().notNull()
})

export const members = sqliteTable("members", {
  id: int().primaryKey({autoIncrement: true}),
  name: text().notNull(),
  groupId: int().references(() => groups.id, {onDelete: 'cascade'}).notNull()
})

export const scores = sqliteTable("scores", {
  id: int().primaryKey({autoIncrement: true}),
  subject: text().notNull(),
  score: real().notNull(),
  groupId: int().references(() => groups.id, {onDelete: 'cascade'}).notNull()
})