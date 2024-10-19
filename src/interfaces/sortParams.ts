import IBlock from "./block";
import { RootDispatch } from "../redux/store";

interface ISortParams {
  blocks: IBlock[];
  animationSpeed: number;
  dispatch: RootDispatch;
}

export default ISortParams;
