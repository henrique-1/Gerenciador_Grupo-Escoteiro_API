import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Branch = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  min_age: z.number().min(6).max(18),
  max_age: z.number().max(21),
});

type Branch = z.infer<typeof Branch>;

export class createBranchService {
  async execute({ name, min_age, max_age }: Branch) {
    const branchAlreadyExists = await prisma.branch.findFirst({
      where: {
        name: name,
      },
    });

    if (branchAlreadyExists) {
      throw new Error("Branch already exists");
    }

    const branch = await prisma.branch.create({
      data: {
        name: name,
        min_age: min_age,
        max_age: max_age,
      },
    });

    return branch;
  }
}

export class listBranchesService {
  async execute() {
    const branches = await prisma.user.findMany();

    return branches;
  }
}

export class listBranchService {
  async execute({ id }: Branch) {
    const branch = await prisma.branch.findFirst({
      where: {
        id: id,
      },
    });

    return branch;
  }
}

export class updateBranchService {
  async execute({ id, name, min_age, max_age }: Branch) {
    const branch = await prisma.branch.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        min_age: min_age,
        max_age: max_age,
      },
    });

    return branch;
  }
}
