import { PrismaClient } from "../generated/prisma";
import { getFileTreeByUserId } from "./file-tree";

export const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({
    where: {
      email: "monkey@happy.com",
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const fileTree = await getFileTreeByUserId(user.id);
  console.dir(fileTree, { depth: null, colors: true });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
