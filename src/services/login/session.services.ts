import { Repository } from "typeorm";
import { Login, LoginReturn } from "../../interfaces/login.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ErrorApp } from "../../errors/error";

const create = async (payload: Login): Promise<LoginReturn> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await repository.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new ErrorApp("Invalid credentials", 401);
  }

  const password = await bcrypt.compare(payload.password, user.password);

  if (!password) {
    throw new ErrorApp("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    { admin: user.admin },
      process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN!,
      subject: String(user.id),
    }
  );
  return { token };
};

export default {create};
