import ISortParams from "../../interfaces/sortParams";
import rearrangeBlocks from "../rearrangeBlocks";

const selectionSort = async ({
  blocks,
  animationSpeed,
  dispatch,
}: ISortParams) => {
  let start = 0;
  let min = null;
  let min_index = null;

  let currentBlocks = blocks.slice();

  while (start < currentBlocks.length - 1) {
    currentBlocks[start] = { ...currentBlocks[start], isSelected: true };

    min = currentBlocks[start].positionNumber;
    min_index = start;

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    for (let i = start + 1; i < currentBlocks.length; i++) {
      currentBlocks[i] = { ...currentBlocks[i], isSelected: true };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      currentBlocks[i] = { ...currentBlocks[i], isSelected: false };

      if (min > currentBlocks[i].positionNumber) {
        min = currentBlocks[i].positionNumber;
        min_index = i;
      }
    }

    currentBlocks[min_index] = {
      ...currentBlocks[min_index],
      isSelected: true,
    };

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    const temp = currentBlocks[min_index].positionNumber;
    currentBlocks[min_index] = {
      ...currentBlocks[min_index],
      positionNumber: currentBlocks[start].positionNumber,
    };

    currentBlocks[start] = { ...currentBlocks[start], positionNumber: temp };

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    currentBlocks[start] = {
      ...currentBlocks[start],
      isSorted: true,
      isSelected: false,
    };

    currentBlocks[min_index] = {
      ...currentBlocks[min_index],
      isSelected: false,
    };

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    start += 1;
  }

  currentBlocks[start] = { ...currentBlocks[start], isSorted: true };

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

  currentBlocks = currentBlocks.map((blockItem) => ({
    ...blockItem,
    isSorted: false,
  }));

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);
};

export default selectionSort;
