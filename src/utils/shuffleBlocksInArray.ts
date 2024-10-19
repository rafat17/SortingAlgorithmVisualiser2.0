import IShuffleParams from "@/interfaces/shuffleParams";
import rearrangeBlocks from "./rearrangeBlocks";

const shuffleBlocksInArray = async ({
  blocks,
  shuffleSpeed,
  dispatch,
}: IShuffleParams) => {
  const copiedBlocks = blocks.slice();

  for (let count = copiedBlocks.length - 1; count > 0; count--) {
    const randomIndex = Math.floor(Math.random() * (count + 1));

    [copiedBlocks[count], copiedBlocks[randomIndex]] = [
      copiedBlocks[randomIndex],
      copiedBlocks[count],
    ];

    await rearrangeBlocks(copiedBlocks.slice(), shuffleSpeed, dispatch);
  }

  return copiedBlocks.slice();
};

export default shuffleBlocksInArray;
