import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  publicationDate: varchar("publicationDate", { length: 256 }).notNull(),
  isbn: varchar("isbn", { length: 13 }).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("createdAt").notNull().defaultNow(),
});

export const student = pgTable("student", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  enrollmentNumber: varchar("enrollmentNumber", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("createdAt").notNull().defaultNow(),
});

export const loans = pgTable("loans", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookId: uuid("bookId")
    .references(() => books.id)
    .notNull(),
  studentId: uuid("studentId")
    .references(() => student.id)
    .notNull(),
  borrowDate: date("borrowDate").notNull().defaultNow(),
  returnDate: date("returnDate").notNull().defaultNow(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("createdAt").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("createdAt").notNull().defaultNow(),
});
