import { setBlocks } from "@/redux/slices/blockSlice";
import ISortParams from "@/interfaces/sortParams";
import delayByMilliseconds from "../delayByMilliseconds";

const insertionSort = async ({
  blocks,
  animationSpeed,
  dispatch,
}: ISortParams) => {
  let count = 1;
  const delayTimeInMilliseconds = 1000 / animationSpeed;
  let currentBlocks = blocks.slice();

  while (count < blocks.length) {
    let back = count - 1;
    let shift = 0;

    currentBlocks[count] = { ...currentBlocks[count], isSelected: true };

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    while (back > -1) {
      currentBlocks[back] = { ...currentBlocks[back], isSelected: true };

      dispatch(setBlocks(currentBlocks.slice()));
      await delayByMilliseconds(delayTimeInMilliseconds);

      if (
        currentBlocks[back].positionNumber > currentBlocks[count].positionNumber
      ) {
        currentBlocks[back] = { ...currentBlocks[back], isSelected: false };

        dispatch(setBlocks(currentBlocks.slice()));
        await delayByMilliseconds(delayTimeInMilliseconds);

        shift++;
        back--;
      } else {
        currentBlocks[back] = { ...currentBlocks[back], isSelected: false };
        break;
      }
    }

    let val = { ...currentBlocks[count] };
    const start = currentBlocks.slice(0, count - shift);

    val = { ...val, isSelected: true };

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    currentBlocks.splice(count, 1);

    const end = currentBlocks.slice(count - shift);

    currentBlocks = [...start, val, ...end];

    val = { ...val, isSorted: true };

    currentBlocks = [...start, val, ...end];

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    val = { ...val, isSorted: false, isSelected: false };

    currentBlocks = [...start, val, ...end];

    count++;
  }

  dispatch(setBlocks(currentBlocks.slice()));
};

export default insertionSort;
