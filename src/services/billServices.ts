import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const Bill = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(64),
  dueDate: z.date(),
  value: z.number().multipleOf(0.01),
  status: z.string().min(4).max(15),
});

type Bill = z.infer<typeof Bill>;

export class createBillService {
  async execute({ name, dueDate, value, status }: Bill) {
    const bill = await prisma.bill.create({
      data: {
        name: name,
        dueDate: dueDate,
        value: value,
        status: status,
      },
    });

    return bill;
  }
}

export class listBillsService {
  async execute() {
    const bills = await prisma.bill.findMany();

    return bills;
  }
}

export class listBillService {
  async execute({ id }: Bill) {
    const bill = await prisma.bill.findFirst({
      where: {
        id: id,
      },
    });

    return bill;
  }
}

export class listBillsByNameService {
  async execute({ name }: Bill) {
    const bills = await prisma.bill.findMany({
      where: {
        name: name,
      },
    });

    return bills;
  }
}

export class listBillsByValueService {
  async execute({ value }: Bill) {
    const bills = await prisma.bill.findMany({
      where: {
        value: value,
      },
    });

    return bills;
  }
}

export class listBillsByStatusService {
  async execute({ status }: Bill) {
    const bills = await prisma.bill.findMany({
      where: {
        status: status,
      },
    });

    return bills;
  }
}

export class listBillsByDueDateService {
  async execute({ dueDate }: Bill) {
    const bills = await prisma.bill.findMany({
      where: {
        dueDate: dueDate,
      },
    });

    return bills;
  }
}

export class updateBillService {
  async execute({ id, name, dueDate, value, status }: Bill) {
    const bill = await prisma.bill.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        dueDate: dueDate,
        value: value,
        status: status,
      },
    });
  }
}
