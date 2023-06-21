import { db } from "../../db";
import { student } from "./../../db/schema";
import { InferModel, eq } from "drizzle-orm";

export type Student = InferModel<typeof student, "select">;
export type NewStudent = InferModel<typeof student, "insert">;

export class StudentService {
  static async getAll(): Promise<Student[]> {
    return await db.select().from(student);
  }

  static async getOne(id: string): Promise<Student> {
    const [newStudent] = await db.select().from(student).where(eq(student.id, id))
    return newStudent;
  }

  static async create(newStudent: NewStudent): Promise<Student> {
    const [createdStudent] = await db
      .insert(student)
      .values(newStudent)
      .returning();
    return createdStudent;
  }

  static async update(id: string, newStudent: Student): Promise<Student> {
    const [updatedStudent] = await db
      .update(student)
      .set(newStudent)
      .where(eq(student.id, id))
      .returning();

    return updatedStudent;
  }

  static async delete(id: string): Promise<Student> {
    const [deleted] = await db.delete(student).where(eq(student.id, id)).returning();
    return deleted;
  }
}
