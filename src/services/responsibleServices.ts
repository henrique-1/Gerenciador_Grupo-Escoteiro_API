import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Responsible = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  cpf: z.string().min(14, { message: "CPF must have at least 14 characters" }).max(14, { message: "CPF must have a maximum of 14 charactes" }),
  phone: z.string().min(16, { message: "Phone must have at least 16 characters" }).max(16, { message: "Phone must have a maximum of 14 charactes" }),
  birth: z.date().max(new Date(), { message: "User must be 6.5 years old" }),
  imagePath: z.string().max(512),
});

type Responsible = z.infer<typeof Responsible>;

export class createResponsibleService {
  async execute({ name, cpf, phone, birth, imagePath }: Responsible) {
    const responsibleAlreadyExists = await prisma.responsible.findFirst({
      where: {
        cpf: cpf,
      },
    });

    if (responsibleAlreadyExists) {
      throw new Error("Responsible already exists");
    }

    const responsible = await prisma.responsible.create({
      data: {
        name: name,
        cpf: cpf,
        phone: phone,
        birth: birth,
        image_path: imagePath,
      },
    });

    return responsible;
  }
}

export class listAccountableService {
  async execute() {
    const accountable = await prisma.responsible.findMany();

    return accountable;
  }
}

export class listResponsibleService {
  async execute({ id }: Responsible) {
    const responsible = await prisma.responsible.findFirst({
      where: {
        id: id,
      },
    });

    return responsible;
  }
}

export class updateResponsibleService {
  async execute({ id, name, phone }: Responsible) {
    const user = await prisma.responsible.update({
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

export class updateResponsibleImageService {
  async execute({ id, imagePath }: Responsible) {
    const user = await prisma.responsible.update({
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
