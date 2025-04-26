import { TFile } from ".";

export const seedFiles = (folderId : string, len : number, format : string, extension : string)=>{
  let rawFileSeedData : TFile[] = [];
  for(let i=0;i<=len;i++){
    const fileName = format + i + "." + extension;
    rawFileSeedData.push({
      name : fileName,
      folderId
    })
  }
  return rawFileSeedData;
} 