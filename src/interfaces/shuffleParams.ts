import { RootDispatch } from "@/redux/store";
import IBlock from "./block";

interface IShuffleParams {
  blocks: IBlock[];
  shuffleSpeed: number;
  dispatch: RootDispatch;
}

export default IShuffleParams;
