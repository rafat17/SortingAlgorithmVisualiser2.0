import IBlock from "@/interfaces/block";
import { RootDispatch } from "@/redux/store";
import { setBlocks } from "@/redux/slices/blockSlice";
import delayByMilliseconds from "./delayByMilliseconds";

const rearrangeBlocks = async (
  blocks: IBlock[],
  animationSpeed: number,
  dispatch: RootDispatch
) => {
  const delayTimeInMilliseconds = 1000 / animationSpeed;

  dispatch(setBlocks(blocks));
  await delayByMilliseconds(delayTimeInMilliseconds);
};

export default rearrangeBlocks;
