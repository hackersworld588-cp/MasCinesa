import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  let datasourceUrl = process.env.DATABASE_URL;

  // On Vercel Serverless (read-only filesystem), copy SQLite to writable /tmp
  if (
    (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) &&
    (!datasourceUrl || datasourceUrl.startsWith("file:"))
  ) {
    try {
      const tmpDb = path.join("/tmp", "dev.db");
      const srcDb = path.join(process.cwd(), "prisma", "dev.db");

      if (!fs.existsSync(tmpDb) && fs.existsSync(srcDb)) {
        fs.copyFileSync(srcDb, tmpDb);
      }

      if (fs.existsSync(tmpDb)) {
        datasourceUrl = `file:${tmpDb}`;
      }
    } catch (e) {
      console.warn("Could not copy SQLite to /tmp:", e);
    }
  }

  return new PrismaClient({
    datasources: datasourceUrl ? { db: { url: datasourceUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const db = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;

export default db;
