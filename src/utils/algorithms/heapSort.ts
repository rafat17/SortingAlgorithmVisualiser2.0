import { RootDispatch } from "../../redux/store";
import { setBlocks } from "../../redux/slices/blockSlice";
import delayByMilliseconds from "../delayByMilliseconds";
import IBlock from "../../interfaces/block";
import ISortParams from "../../interfaces/sortParams";

async function maxHeapify(
  blocks: IBlock[],
  idx: number,
  heap_s: number = blocks.length,
  dispatch: RootDispatch,
  delayTimeInMilliseconds: number
) {
  if (heap_s == 1 || heap_s == 0) return;

  const [left, right, heapSize] = [2 * idx + 1, 2 * idx + 2, heap_s];

  let largest = idx;

  blocks[idx] = { ...blocks[idx], isSelected: true };

  dispatch(setBlocks(blocks.slice()));
  await delayByMilliseconds(delayTimeInMilliseconds);

  if (left < heapSize) {
    if (blocks[left].positionNumber > blocks[largest].positionNumber) {
      largest = left;
    }
  }

  if (right < heapSize) {
    if (blocks[right].positionNumber > blocks[largest].positionNumber) {
      largest = right;
    }
  }

  if (largest !== idx) {
    blocks[largest] = { ...blocks[largest], isSelected: true };

    dispatch(setBlocks(blocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    const temp = blocks[largest].positionNumber;
    blocks[largest] = {
      ...blocks[largest],
      positionNumber: blocks[idx].positionNumber,
    };

    blocks[idx] = { ...blocks[idx], positionNumber: temp };

    dispatch(setBlocks(blocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    blocks[idx] = { ...blocks[idx], isSelected: false };
    blocks[largest] = { ...blocks[largest], isSelected: false };

    dispatch(setBlocks(blocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    await maxHeapify(
      blocks,
      largest,
      heap_s,
      dispatch,
      delayTimeInMilliseconds
    );
  } else {
    blocks[idx] = { ...blocks[idx], isSelected: false };

    dispatch(setBlocks(blocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);
  }
}

async function buildMaxHeap(
  blocks: IBlock[],
  dispatch: RootDispatch,
  delayTimeInMilliseconds: number
) {
  const start = Math.floor(blocks.length / 2);

  for (let i = start; i > -1; i--) {
    dispatch(setBlocks(blocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    await maxHeapify(
      blocks,
      i,
      blocks.length,
      dispatch,
      delayTimeInMilliseconds
    );
  }

  dispatch(setBlocks(blocks.slice()));
  await delayByMilliseconds(delayTimeInMilliseconds);
}

const heapSort = async ({ blocks, animationSpeed, dispatch }: ISortParams) => {
  const delayTimeInMilliseconds = 1000 / animationSpeed;
  let currentBlocks = blocks.slice();

  await buildMaxHeap(currentBlocks, dispatch, delayTimeInMilliseconds);

  let heapSize = currentBlocks.length - 1;

  for (let i = currentBlocks.length - 1; i > -1; i--) {
    currentBlocks[i] = { ...currentBlocks[i], isSelected: true };
    currentBlocks[0] = { ...currentBlocks[0], isSelected: true };

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    const temp = currentBlocks[i].positionNumber;

    currentBlocks[i] = {
      ...currentBlocks[i],
      positionNumber: currentBlocks[0].positionNumber,
    };
    currentBlocks[0] = { ...currentBlocks[0], positionNumber: temp };

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    currentBlocks[i] = { ...currentBlocks[i], isSelected: false };
    currentBlocks[0] = { ...currentBlocks[0], isSelected: false };
    currentBlocks[i] = { ...currentBlocks[i], isSorted: true };

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);

    await maxHeapify(
      currentBlocks,
      0,
      heapSize,
      dispatch,
      delayTimeInMilliseconds
    );

    heapSize--;

    currentBlocks = currentBlocks.map((blockItem) => ({
      ...blockItem,
      isSorted: false,
    }));

    dispatch(setBlocks(currentBlocks.slice()));
    await delayByMilliseconds(delayTimeInMilliseconds);
  }
};

export default heapSort;
