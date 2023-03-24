import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const EventUser = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  userId: z.string().uuid(),
});

type EventUser = z.infer<typeof EventUser>;

export class createEventUserService {
  async execute({ eventId, userId }: EventUser) {
    const eventUserAlreadyExists = await prisma.event_user.findFirst({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });

    if (eventUserAlreadyExists) {
      throw new Error("Event associated to user already exists");
    }

    const eventUser = await prisma.event_user.create({
      data: {
        eventId: eventId,
        userId: userId,
      },
    });

    return eventUser;
  }
}

