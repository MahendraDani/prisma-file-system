import { prisma } from "./index";

type Folder = {
  id: string;
  name: string;
  parentFolderId: string | null; // null for root folders
};

type FolderWithChildren = Folder & {
  subfolders: FolderWithChildren[];
};

// Map of parentId -> folders[]
const folderMap: Record<string, Folder[]> = {};

function buildTree(folderMap: Record<string, Folder[]>, parentId: string = 'root'): FolderWithChildren[] {
  const folders = folderMap[parentId] || [];

  return folders.map((folder) => ({
    ...folder,
    subfolders: buildTree(folderMap, folder.id),
  }));
}

export async function getFileTreeByUserId(userId: string) {
  const folders = await prisma.folder.findMany({
    where: { userId },
    include: { files: true },
  });

  const folderMap: Record<string, Folder[]> = {};

  // build the folderMap by grouping folders by their parentFolderId
  for (const folder of folders) {
    const parentId = folder.parentFolderId ?? 'root';
    if (!folderMap[parentId]) {
      folderMap[parentId] = [];
    }
    folderMap[parentId].push(folder);
  }

  // recursively build tree
  const fileTree = buildTree(folderMap);
  
  return fileTree;
}
