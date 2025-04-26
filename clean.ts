import { prisma } from "./index"

async function main(){
  const deleteFiles = await prisma.file.deleteMany();
  console.log(deleteFiles) 
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