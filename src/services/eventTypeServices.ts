import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const EventType = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  description: z.string().max(2048),
});

type EventType = z.infer<typeof EventType>;

export class createEventTypeService {
  async execute({ name, description }: EventType) {
    const eventTypeAlreadyExists = await prisma.event_type.findFirst({
      where: {
        name: name,
      },
    });

    if (eventTypeAlreadyExists) {
      throw new Error("Event Type already exists");
    }

    const eventType = await prisma.event_type.create({
      data: {
        name: name,
        description: description,
      },
    });

    return eventType;
  }
}

export class listEventTypesService {
  async execute() {
    const eventTypes = await prisma.event_type.findMany();

    return eventTypes;
  }
}

export class listEventTypeService {
  async execute({ id }: EventType) {
    const eventType = await prisma.event_type.findFirst({
      where: {
        id: id,
      },
    });

    return eventType;
  }
}

export class updateEventTypeService {
  async execute({ id, name, description }: EventType) {
    const eventType = await prisma.event_type.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
    });
  }
}
