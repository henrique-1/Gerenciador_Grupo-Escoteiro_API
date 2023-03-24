import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Role = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  description: z.string().max(2048, { message: "Description must have a maximum of 2048 charactes" }),
  branchId: z.string().uuid(),
});

type Role = z.infer<typeof Role>;

export class createRoleService {
  async execute({ name, description, branchId }: Role) {
    const roleAlreadyExists = await prisma.role.findFirst({
      where: {
        name: name,
      },
    });

    if (roleAlreadyExists) {
      throw new Error("Role already exists");
    }

    const role = await prisma.role.create({
      data: {
        name: name,
        description: description,
        branchId: branchId,
      },
    });

    return role;
  }
}

export class listRolesService {
  async execute() {
    const roles = await prisma.role.findMany();

    return roles;
  }
}

export class listRoleService {
  async execute({ id }: Role) {
    const role = await prisma.role.findFirst({
      where: {
        id: id,
      },
    });

    return role;
  }
}

export class listRoleByBranchService {
  async execute({ branchId }: Role) {
    const role = await prisma.role.findFirst({
      where: {
        branchId: branchId,
      },
    });

    return role;
  }
}

export class updateRoleService {
  async execute({ id, name, description, branchId }: Role) {
    const role = await prisma.role.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        branchId: branchId,
      },
    });

    return role;
  }
}
