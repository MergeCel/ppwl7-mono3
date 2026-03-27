import { prisma } from "./db";
import { readFileSync } from "fs";
import { join } from "path";

const sql = readFileSync(join(__dirname, "../baseline.sql"), "utf-8");

const statements = sql
  .split(";")
  .map(s => s.trim())
  .filter(s => s.length > 0);

for (const statement of statements) {
  await prisma.$executeRawUnsafe(statement);
}

console.log(process.env.DATABASE_URL);
console.log(process.env.AUTH_TOKEN);

await prisma.$disconnect();