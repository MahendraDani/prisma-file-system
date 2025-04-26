import { PrismaClient } from './generated/prisma'
import { seedFiles } from './seed-files';

export const prisma = new PrismaClient()

export type TFile = {
  name : string;
  folderId : string
}

// unique file invocation error -> P2002, PrismaKnownClientRequestError

async function main() {

  // get all files and folders of a user
  const monkeyFileSystem = await prisma.user.findFirst({
    where : {
      email : "monkey@happy.com"
    },
    include : {
      Folders : {
        include : {
          files : true
        }
      }
    }
  })

  console.dir(monkeyFileSystem, {depth : null})

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })