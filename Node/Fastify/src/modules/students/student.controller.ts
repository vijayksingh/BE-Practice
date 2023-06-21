import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NewStudent, Student, StudentService } from "./students.service";

const createStudentSchema = z.object({
  name: z.string().min(1).max(256),
  email: z.string().email(),
  enrollmentNumber: z.string().min(1).max(256),
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const create = async (
  req: FastifyRequest<{ Body: NewStudent }>,
  res: FastifyReply
) => {
  try {
    const newStudent = createStudentSchema.parse(req.body);
    const createdStudent = await StudentService.create(newStudent);
    res.code(201).send(createdStudent);
  } catch (error) {
    res.code(400).send(error.message);
  }
};

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const students = await StudentService.getAll();
    res.code(200).send(students);
  } catch (error) {
    res.code(400).send(error.message);
  }
};

export const getOne = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const student = await StudentService.getOne(req.params.id);
    res.code(200).send(student);
  } catch (error) {
    res.code(400).send(error.message);
  }
};

export const update = async (
  req: FastifyRequest<{ Params: { id: string }; Body: NewStudent }>,
  res: FastifyReply
) => {
  try {
    const newStudent = createStudentSchema.parse(req.body) as Student;
    const updatedStudent = await StudentService.update(
      req.params.id,
      newStudent
    );
    res.code(200).send(updatedStudent);
  } catch (error) {
    res.code(400).send(error.message);
  }
};

export const deleteOne = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const deletedStudent = await StudentService.delete(req.params.id);
    res.code(200).send(deletedStudent);
  } catch (error) {
    res.code(400).send(error.message);
  }
};
