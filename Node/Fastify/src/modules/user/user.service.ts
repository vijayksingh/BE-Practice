import { db } from "../../db";
import { users } from "../../db/schema";
import { InferModel, eq } from "drizzle-orm";

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;

export class UserService {
  
  static async getOne(username: string): Promise<User> {
    const [newUser] = await db.select().from(users).where(eq(users.username, username))
    return newUser;
  }

  static async create(newUser: NewUser): Promise<User> {
    const [createdUser] = await db
      .insert(users)
      .values(newUser)
      .returning();
    return createdUser;
  }

  static async update(id: string, newUser: User): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(newUser)
      .where(eq(users.id, id))
      .returning();

    return updatedUser;
  }

  static async delete(id: string): Promise<User> {
    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
    return deleted;
  }
}