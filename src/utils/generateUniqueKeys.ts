import { v4 as uuidv4 } from "uuid";

const generateUniqueKeys = (totalCount: number) => {
  const uuidArray = [];

  for (let count = 0; count < totalCount; count++) {
    uuidArray.push(uuidv4());
  }

  return uuidArray;
};

export default generateUniqueKeys;
