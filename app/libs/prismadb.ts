import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
} //global definition work throughout our code

const client = globalThis.prisma || new PrismaClient(); //const client search for globalThis or create prisma client
if (process.env.NODE_ENV != "production") globalThis.prisma = client;
//check if we are not in production then set globalThis.prisma to client. Assign prisma client to global this variable, so it's not affected by hot reload. Nextjs reload creates many prismaclient instances

export default client;

//prisma client --> needs to be accepted by adapter in [..nextauth] file
