import { TFile } from ".";
import {PrismaClient} from "./generated/prisma"

const prisma = new PrismaClient();

async function main() {
  const monkey = await prisma.user.create({
    data : {
      name : "Happy Monkey",
      email : "monkey@happy.com"
    }
  })

  const monkeyFolder = await prisma.folder.create({
    data : {
      name : "monkeydir",
      userId : monkey.id 
    }
  })

  let createFileData : TFile[] = [];
  for(let i=1;i<=5;i++){
    const file = "banana" + i + ".txt";
    createFileData.push({
      name : file,
      folderId : monkeyFolder.id
    })
  }

  const monkeyFiles = await prisma.file.createManyAndReturn({
    data : createFileData,
  })
  console.log(monkeyFiles)
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