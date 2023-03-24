import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { z } from "zod";

const Payload = z.object({
  sub: z.string(),
});

type Payload = z.infer<typeof Payload>;

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.header.authorization;

  if (!authToken) {
    return response.status(401).send("User must be logged in").end;
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "") as Payload;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
