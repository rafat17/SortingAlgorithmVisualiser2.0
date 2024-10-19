import { setBlocks } from "../../redux/slices/blockSlice";
import delayByMilliseconds from "../delayByMilliseconds";
import ISortParams from "../../interfaces/sortParams";

const mergeArray = async (
  { blocks: arr, animationSpeed, dispatch }: ISortParams,
  start: number,
  mid: number,
  end: number
) => {
  const delayTimeInMilliseconds = 1000 / animationSpeed;

  const new_arr = [];
  let i = start;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    if (arr[i].positionNumber <= arr[j].positionNumber) {
      new_arr.push(arr[i].positionNumber);
      i++;
    } else {
      new_arr.push(arr[j].positionNumber);
      j++;
    }
  }

  if (i > mid) {
    arr[i] = { ...arr[i], isSelected: false };

    while (j <= end) {
      new_arr.push(arr[j].positionNumber);
      j++;
    }
  } else {
    while (i <= mid) {
      new_arr.push(arr[i].positionNumber);
      i++;
    }
  }

  for (let m = 0; m < new_arr.length; m++) {
    arr[start + m] = { ...arr[start + m], isSelected: true };

    dispatch(setBlocks(arr.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    arr[start + m] = { ...arr[start + m], positionNumber: new_arr[m] };

    dispatch(setBlocks(arr.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);
  }

  dispatch(setBlocks(arr.slice()));
  await delayByMilliseconds(delayTimeInMilliseconds);

  for (let m = 0; m < new_arr.length; m++) {
    arr[start + m] = { ...arr[start + m], isSelected: false, isSorted: true };
  }

  dispatch(setBlocks(arr.slice()));
  await delayByMilliseconds(delayTimeInMilliseconds);

  for (let m = 0; m < new_arr.length; m++) {
    arr[start + m] = { ...arr[start + m], isSorted: false };
  }

  dispatch(setBlocks(arr.slice()));
  await delayByMilliseconds(delayTimeInMilliseconds);
};

const mergeSort = async (
  { blocks, animationSpeed, dispatch }: ISortParams,
  startIndex: number = 0,
  endIndex: number = blocks.length - 1
) => {
  const requiredArguments = { blocks, animationSpeed, dispatch };
  if (startIndex < endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    await mergeSort(requiredArguments, startIndex, midIndex);
    await mergeSort(requiredArguments, midIndex + 1, endIndex);
    await mergeArray(requiredArguments, startIndex, midIndex, endIndex);
  }
};

export default mergeSort;
