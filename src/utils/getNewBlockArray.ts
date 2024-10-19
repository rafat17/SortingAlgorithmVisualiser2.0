import IBlock from "../interfaces/block";

type BlockArrayType = IBlock[] | [];

const getNewBlockArray = (count: number): BlockArrayType => {
  if (!count) {
    return [];
  }

  const blocksArray = [];

  for (let currentCount = 0; currentCount < count; currentCount++) {
    blocksArray.push({
      positionNumber: 1 + Math.floor(Math.random() * 100),
      displayNumber: true,
      isSelected: false,
      isPivoted: false,
      isSorted: false,
    });
  }

  return blocksArray;
};

export default getNewBlockArray;
