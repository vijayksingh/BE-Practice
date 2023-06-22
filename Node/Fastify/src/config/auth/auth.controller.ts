import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./../../modules/user/user.service";

export const register = async (
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  res: FastifyReply
) => {
  const { username, password } = req.body;
  const user = await UserService.getOne(username);

  if (user) return res.status(409).send({ message: "User already exists" });

  const newUser = await UserService.create({ username, password });
  return res.status(201).send(newUser);
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};

export const refresh = async (req, res) => {};
