import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Hono();

app.get("/", async (c) => {
  const count = await prisma.pipelineGroup.count();
  return c.text("Hello Hono!" + count);
});

export default app;
