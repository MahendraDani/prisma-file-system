import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function seed() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Happy Monkey',
        email: 'monkey@happy.com',
      },
    });

    console.log(user.email);

    // root folders
    const folder1 = await prisma.folder.create({
      data: {
        name: 'Documents',
        userId: user.id,
      },
    });

    const folder2 = await prisma.folder.create({
      data: {
        name: 'Pictures',
        userId: user.id,
      },
    });

    console.log('Created root folders:', folder1.name, folder2.name);

    // subfolders inside 'Documents'
    const subfolder1 = await prisma.folder.create({
      data: {
        name: 'Work',
        userId: user.id,
        parentFolderId: folder1.id,
      },
    });

    const subfolder2 = await prisma.folder.create({
      data: {
        name: 'Personal',
        userId: user.id,
        parentFolderId: folder1.id,
      },
    });

    console.log('Created subfolders:', subfolder1.name, subfolder2.name);

    // create files in root folder and subfolders
    await prisma.file.createMany({
      data: [
        { name: 'resume.pdf', folderId: folder1.id },
        { name: 'cover_letter.docx', folderId: folder1.id },
        { name: 'project_plan.xlsx', folderId: subfolder1.id },
        { name: 'family_photo.jpg', folderId: folder2.id },
        { name: 'vacation.png', folderId: folder2.id },
      ],
    });

    console.log('Created files!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
