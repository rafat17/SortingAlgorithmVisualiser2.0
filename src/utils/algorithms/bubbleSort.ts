import ISortParams from "../../interfaces/sortParams";
import rearrangeBlocks from "../rearrangeBlocks";

const bubbleSort = async ({
  blocks,
  animationSpeed,
  dispatch,
}: ISortParams) => {
  let swapCount = -1;
  let currentLength = blocks.length;

  let currentBlocks = blocks.slice();

  while (swapCount != 0) {
    swapCount = 0;
    let currentIndex = 0;

    while (currentIndex < currentLength - 1) {
      currentBlocks[currentIndex] = {
        ...currentBlocks[currentIndex],
        isSelected: true,
      };
      currentBlocks[currentIndex + 1] = {
        ...currentBlocks[currentIndex + 1],
        isSelected: true,
      };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      if (
        currentBlocks[currentIndex].positionNumber >
        currentBlocks[currentIndex + 1].positionNumber
      ) {
        const temp = currentBlocks[currentIndex + 1].positionNumber;
        const someValue = currentBlocks[currentIndex].positionNumber;
        currentBlocks[currentIndex + 1] = {
          ...currentBlocks[currentIndex + 1],
          positionNumber: someValue,
        };

        currentBlocks[currentIndex] = {
          ...currentBlocks[currentIndex],
          positionNumber: temp,
        };

        swapCount++;
      }

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      currentBlocks[currentIndex] = {
        ...currentBlocks[currentIndex],
        isSelected: false,
      };
      currentBlocks[currentIndex + 1] = {
        ...currentBlocks[currentIndex + 1],
        isSelected: false,
      };

      currentIndex++;
    }

    currentBlocks[currentIndex] = {
      ...currentBlocks[currentIndex],
      isSorted: true,
    };

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    currentLength -= 1;
  }

  currentBlocks = currentBlocks.map((blockItem) => ({
    ...blockItem,
    isSorted: true,
  }));

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

  currentBlocks = currentBlocks.map((blockItem) => ({
    ...blockItem,
    isSorted: false,
  }));

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);
};

export default bubbleSort;
