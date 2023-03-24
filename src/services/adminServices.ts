import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Admin = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  cpf: z.string().min(14, { message: "CPF must have at least 14 characters" }).max(14, { message: "CPF must have a maximum of 14 charactes" }),
  phone: z.string().min(16, { message: "Phone must have at least 16 characters" }).max(16, { message: "Phone must have a maximum of 14 charactes" }),
  birth: z.date().max(new Date(), { message: "User must be 6.5 years old" }),
  branchId: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  imagePath: z.string().max(512),
});

type Admin = z.infer<typeof Admin>;

export class createAdminService {
  async execute({ name, cpf, phone, birth, branchId, email, password, imagePath }: Admin) {
    const adminAlreadyExists = await prisma.administrator.findFirst({
      where: {
        cpf: cpf,
      },
    });

    if (adminAlreadyExists) {
      throw new Error("Admin already exists");
    }

    const admin = await prisma.administrator.create({
      data: {
        name: name,
        cpf: cpf,
        phone: phone,
        birth: birth,
        email: email,
        password: password,
        image_path: imagePath,
        branchId: branchId,
      },
    });

    return admin;
  }
}

export class listAdminsService {
  async execute() {
    const admins = await prisma.administrator.findMany();

    return admins;
  }
}

export class listAdminService {
  async execute({ id }: Admin) {
    const admin = await prisma.administrator.findFirst({
      where: {
        id: id,
      },
    });

    return admin;
  }
}

export class updateAdminService {
  async execute({ id, name, phone }: Admin) {
    const admin = await prisma.administrator.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
      },
    });

    return admin;
  }
}

export class updateAdminImageService {
  async execute({ id, imagePath }: Admin) {
    const admin = await prisma.administrator.update({
      where: {
        id: id,
      },
      data: {
        image_path: imagePath,
      },
    });

    return admin;
  }
}
