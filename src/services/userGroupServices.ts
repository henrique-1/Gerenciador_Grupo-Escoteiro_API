import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const UserGroup = z.object({
  id: z.string().uuid(),
  groupId: z.string().uuid(),
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});

type UserGroup = z.infer<typeof UserGroup>;

export class createUserGroupService {
  async execute({ groupId, userId, roleId }: UserGroup) {
    const userGroup = await prisma.users_group.create({
      data: {
        groupId: groupId,
        userId: userId,
        roleId: roleId,
      },
    });

    return userGroup;
  }
}

export class listUserGroupsService {
  async execute() {
    const usersGroups = await prisma.users_group.findMany();

    return usersGroups;
  }
}

export class listUserGroupByGroupService {
  async execute({ groupId }: UserGroup) {
    const usersGroup = await prisma.users_group.findMany({
      where: {
        groupId: groupId,
      },
    });

    return usersGroup;
  }
}

export class listUserGroupByUserService {
  async execute({ userId }: UserGroup) {
    const userGroup = await prisma.users_group.findFirst({
      where: {
        userId: userId,
      },
    });

    return userGroup;
  }
}
