import { User } from "@prisma/client";

export type UserEntity = Omit<User, "password">