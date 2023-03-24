import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const User = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  cpf: z.string().min(14, { message: "CPF must have at least 14 characters" }).max(14, { message: "CPF must have a maximum of 14 charactes" }),
  phone: z.string().min(16, { message: "Phone must have at least 16 characters" }).max(16, { message: "Phone must have a maximum of 14 charactes" }),
  birthDay: z.date().max(new Date(), { message: "User must be 6.5 years old" }),
  imagePath: z.string().max(512),
});

type User = z.infer<typeof User>;

export class createUserService {
  async execute({ name, cpf, phone, birthDay, imagePath }: User) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        cpf: cpf,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        cpf: cpf,
        phone: phone,
        birth: birthDay,
        image_path: imagePath,
      },
    });

    return user;
  }
}

export class listUsersService {
  async execute() {
    const users = await prisma.user.findMany();

    return users;
  }
}

export class listUserService {
  async execute({ id }: User) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return user;
  }
}

export class updateUserService {
  async execute({ id, name, phone }: User) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
      },
    });

    return user;
  }
}

export class updateUserImageService {
  async execute({ id, imagePath }: User) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image_path: imagePath,
      },
    });

    return user;
  }
}
