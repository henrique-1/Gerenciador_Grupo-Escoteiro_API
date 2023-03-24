import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Group = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  branchId: z.string().uuid(),
});

type Group = z.infer<typeof Group>;

export class createGroupService {
  async execute({ name, branchId }: Group) {
    const groupAlreadyExists = await prisma.group.findFirst({
      where: {
        name: name,
      },
    });

    if (groupAlreadyExists) {
      throw new Error("Group already exists");
    }

    const group = await prisma.group.create({
      data: {
        name: name,
        branchId: branchId,
      },
    });

    return group;
  }
}

export class listGroupsService {
  async execute() {
    const groups = await prisma.group.findMany();

    return groups;
  }
}

export class listGroupsByBranchService {
  async execute({ branchId }: Group) {
    const groups = await prisma.group.findMany({
      where: {
        branchId: branchId,
      },
    });

    return groups;
  }
}

export class updateGroupService {
  async execute({ id, name, branchId }: Group) {
    const group = await prisma.group.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        branchId: branchId,
      },
    });

    return group;
  }
}
