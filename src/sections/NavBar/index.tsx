import { useDispatch, useSelector } from "react-redux";
import { SelectBox, Slider, Button } from "@/components";
import { RootState } from "@/redux/store";
import { setBlockCount, setBlocks } from "@/redux/slices/blockSlice";
import { toggleLockControls } from "@/redux/slices/inputControlSlice";
import {
  setAnimationSpeed,
  setSelectedAlgorithm,
} from "@/redux/slices/inputControlSlice";
import { shuffleBlocksInArray, getNewBlockArray } from "@/utils";
import {
  bubbleSort,
  heapSort,
  insertionSort,
  quickSort,
  selectionSort,
  mergeSort,
} from "@/utils/algorithms";
import {
  BLOCK_LABEL,
  ANIMATION_SPEED_LABEL,
  ALGORITHM_PLACEHOLDER_TEXT,
  SORT_BUTTON_LABEL,
} from "@/constants/inputLabels";
import { AnimationSpeedEnum, BlocksEnum, SortingAlgorithmsEnum } from "@/enums";
import AlgorithmOptions from "@/constants/algorithmOptions";
import IBlock from "@/interfaces/block";
import "./index.scss";

const NavBar = () => {
  const dispatch = useDispatch();

  const { blocks, count: blockCount } = useSelector(
    (state: RootState) => state.block
  );
  const animationSpeed = useSelector(
    (state: RootState) => state.inputControl.animationSpeed
  );
  const selectedAlgorithm = useSelector(
    (state: RootState) => state.inputControl.selectedSortingAlgorithm
  );
  const areControlsLocked = useSelector(
    (state: RootState) => state.inputControl.lockControls
  );

  const runSortingAlgorithm = async (
    name: string,
    shuffledBlocks: IBlock[]
  ) => {
    const requiredArguments = {
      blocks: shuffledBlocks,
      animationSpeed,
      dispatch,
    };

    switch (name) {
      case SortingAlgorithmsEnum.BUBBLE_SORT:
        await bubbleSort(requiredArguments);
        break;
      case SortingAlgorithmsEnum.INSERTION_SORT:
        await insertionSort(requiredArguments);
        break;
      case SortingAlgorithmsEnum.HEAP_SORT:
        await heapSort(requiredArguments);
        break;
      case SortingAlgorithmsEnum.QUICK_SORT:
        await quickSort(requiredArguments);
        break;
      case SortingAlgorithmsEnum.MERGE_SORT:
        await mergeSort(requiredArguments);
        break;
      default:
        await selectionSort(requiredArguments);
    }
  };

  const handleSelectValueChange = (value: string) => {
    dispatch(setSelectedAlgorithm(value));
  };

  const handleBlockCountChange = (value: number[]) => {
    const blockCount = value[0];
    const blocks = getNewBlockArray(blockCount);

    dispatch(setBlocks(blocks));
    dispatch(setBlockCount(blockCount));
  };

  const handleAnimationSpeedChange = (value: number[]) => {
    dispatch(setAnimationSpeed(value[0]));
  };

  const handleOnClick = async () => {
    dispatch(toggleLockControls());

    const shuffledBlocks = await shuffleBlocksInArray({
      blocks,
      shuffleSpeed: animationSpeed,
      dispatch,
    });

    await runSortingAlgorithm(selectedAlgorithm, shuffledBlocks);

    dispatch(toggleLockControls());
  };

  return (
    <nav className="bg-gray-800 py-2">
      <h4 className="px-8 pt-2 text-xl text-white font-bold">
        Sorting Algorithm Visualiser
      </h4>
      <div className="flex justify-between items-center px-8 pt-2 h-16">
        <div className="flex justify-start gap-x-12 w-25">
          <Slider
            labelClassName="w-[60px]"
            disabled={areControlsLocked}
            label={BLOCK_LABEL}
            onValueChange={handleBlockCountChange}
            defaultValue={[blockCount]}
            max={BlocksEnum.MAX_VALUE}
            min={BlocksEnum.MIN_VALUE}
            step={BlocksEnum.STEP_VALUE}
          />
          <Slider
            labelClassName="w-[250px]"
            disabled={areControlsLocked}
            label={ANIMATION_SPEED_LABEL}
            onValueChange={handleAnimationSpeedChange}
            defaultValue={[animationSpeed]}
            max={AnimationSpeedEnum.MAX_VALUE}
            min={AnimationSpeedEnum.MIN_VALUE}
            step={AnimationSpeedEnum.STEP_VALUE}
          />
        </div>
        <div className="flex justify-end gap-x-4 w-25">
          <SelectBox
            disabled={areControlsLocked}
            placeholderText={ALGORITHM_PLACEHOLDER_TEXT}
            defaultValue={selectedAlgorithm}
            value={selectedAlgorithm}
            onValueChange={handleSelectValueChange}
            options={AlgorithmOptions}
          />
          <Button
            label={SORT_BUTTON_LABEL}
            disabled={areControlsLocked}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
