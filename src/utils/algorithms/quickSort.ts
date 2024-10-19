import ISortParams from "../../interfaces/sortParams";
import rearrangeBlocks from "../rearrangeBlocks";

const partition = async (
  { blocks: currentBlocks, animationSpeed, dispatch }: ISortParams,
  low: number,
  high: number
) => {
  const pivot = currentBlocks[low].positionNumber;
  let start = low;
  let end = high;

  currentBlocks[low] = { ...currentBlocks[low], isPivoted: true };

  while (start < end) {
    currentBlocks[start] = { ...currentBlocks[start], isSelected: true };
    currentBlocks[end] = { ...currentBlocks[end], isSelected: true };

    await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

    while (currentBlocks[start].positionNumber <= pivot) {
      currentBlocks[start] = { ...currentBlocks[start], isSelected: false };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      start++;

      if (start > currentBlocks.length - 1) {
        break;
      } else {
        currentBlocks[start] = { ...currentBlocks[start], isSelected: true };

        await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);
      }
    }

    while (currentBlocks[end].positionNumber > pivot) {
      currentBlocks[end] = { ...currentBlocks[end], isSelected: false };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      end--;

      if (end < 0) break;
      else {
        currentBlocks[end] = { ...currentBlocks[end], isSelected: true };

        await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);
      }
    }

    if (start < end) {
      currentBlocks[start] = { ...currentBlocks[start], isSelected: true };
      currentBlocks[end] = { ...currentBlocks[end], isSelected: true };

      const temp = currentBlocks[end].positionNumber;

      currentBlocks[end] = {
        ...currentBlocks[end],
        positionNumber: currentBlocks[start].positionNumber,
      };

      currentBlocks[start] = {
        ...currentBlocks[start],
        positionNumber: temp,
      };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

      currentBlocks[start] = { ...currentBlocks[start], isSelected: false };
      currentBlocks[end] = { ...currentBlocks[end], isSelected: false };

      await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);
    } else {
      if (start <= currentBlocks.length - 1) {
        currentBlocks[start] = { ...currentBlocks[start], isSelected: false };
      }
      if (end >= 0) {
        currentBlocks[end] = { ...currentBlocks[end], isSelected: false };
      }
    }
  }

  currentBlocks[end] = { ...currentBlocks[end], isSelected: true };

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

  const temp = currentBlocks[end].positionNumber;

  currentBlocks[end] = {
    ...currentBlocks[end],
    positionNumber: currentBlocks[low].positionNumber,
  };
  currentBlocks[low] = {
    ...currentBlocks[low],
    positionNumber: temp,
  };

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

  currentBlocks[low] = { ...currentBlocks[low], isPivoted: false };
  currentBlocks[end] = {
    ...currentBlocks[end],
    isSelected: false,
    isSorted: true,
  };

  await rearrangeBlocks(currentBlocks.slice(), animationSpeed, dispatch);

  return end;
};

const mainQuickSortMethod = async (
  { blocks, animationSpeed, dispatch }: ISortParams,
  low: number = 0,
  high: number = blocks.length - 1
) => {
  const requiredArguments = { blocks, animationSpeed, dispatch };

  if (low < high) {
    const partitionPoint = await partition(requiredArguments, low, high);
    await mainQuickSortMethod(requiredArguments, low, partitionPoint - 1);
    await mainQuickSortMethod(requiredArguments, partitionPoint + 1, high);
  }

  if (low === high) {
    blocks[low] = { ...blocks[low], isSorted: true };

    await rearrangeBlocks(blocks.slice(), animationSpeed, dispatch);
  }
};

const quickSort = async (
  { blocks, animationSpeed, dispatch }: ISortParams,
  low: number = 0,
  high: number = blocks.length - 1
) => {
  await mainQuickSortMethod({ blocks, animationSpeed, dispatch }, low, high);

  const newBlocks = blocks.map((blockItem) => ({
    ...blockItem,
    isSorted: false,
  }));

  await rearrangeBlocks(newBlocks.slice(), animationSpeed, dispatch);
};

export default quickSort;
