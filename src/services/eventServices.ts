import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Event = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  eventTypeId: z.string().uuid(),
  date: z.date(),
});

type Event = z.infer<typeof Event>;

export class createEventService {
  async execute({ name, eventTypeId, date }: Event) {
    const eventAlreadyExists = await prisma.event.findFirst({
      where: {
        name: name,
      },
    });

    if (eventAlreadyExists) {
      throw new Error("Event already exists");
    }

    const event = await prisma.event.create({
      data: {
        name: name,
        event_typeId: eventTypeId,
        date: date,
      },
    });

    return event;
  }
}

export class listEventsService {
  async execute() {
    const events = await prisma.event.findMany();

    return events;
  }
}

export class listEventService {
  async execute({ id }: Event) {
    const event = await prisma.event.findFirst({
      where: {
        id: id,
      },
    });

    return event;
  }
}

export class listEventsByEventTypeService {
  async execute({ eventTypeId }: Event) {
    const events = await prisma.event.findMany({
      where: {
        event_typeId: eventTypeId,
      },
    });

    return events;
  }
}

export class listEventByDateService {
  async execute({ date }: Event) {
    const events = await prisma.event.findMany({
      where: {
        date: date,
      },
    });

    return events;
  }
}

export class updateEventService {
  async execute({ id, name, eventTypeId, date }: Event) {
    const Event = await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        event_typeId: eventTypeId,
        date: date,
      },
    });

    return Event;
  }
}
