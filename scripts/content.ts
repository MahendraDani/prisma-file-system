// This scripts is used after add_content_file_optional migration to introduce
// `content` property to File table

import { prisma } from "../src"

async function main(){
  const updated = await prisma.file.updateManyAndReturn({
    data : {
      content : ""
    }
  })
  console.log(updated);
}

main().catch(async (e)=>{
  console.log(e);
  process.exit(1);
}).finally(async ()=>{
  prisma.$disconnect();
})