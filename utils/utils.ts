import * as fs from 'fs';

export function generateRadnomNumber(min: number, max: number): number {
  const randomNumber= Math.random() * (max - min) + min;
  return Math.floor(randomNumber)
}

export function saveJsonData(jsonObject: object, fileUrl: string): void {
  let dataArray: object[] = [];
  
  if (fs.existsSync(fileUrl)) {
    const fileContent = fs.readFileSync(fileUrl, 'utf-8');
    dataArray = JSON.parse(fileContent);
  }
  
  dataArray.push(jsonObject);
  fs.writeFileSync(fileUrl, JSON.stringify(dataArray, null, 2), 'utf-8');
}

export function getLastUser(fileUrl: string): object {
  const fileContent = fs.readFileSync(fileUrl, 'utf-8');
  const dataArray = JSON.parse(fileContent);
  return dataArray[dataArray.length - 1];
}
