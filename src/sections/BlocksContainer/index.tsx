import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Block, Legend } from "@/components";
import { RootState } from "@/redux/store";
import { generateUniqueKeys, getLabelsForLegend } from "@/utils";
import { DEFAULT_LEGEND_LABEL } from "@/constants/defaultValues";

const BlocksContainer = () => {
  const { blocks, count } = useSelector((state: RootState) => state.block);
  const selectedAlgorithm = useSelector(
    (state: RootState) => state.inputControl.selectedSortingAlgorithm
  );

  const uniqueKeys = useMemo<string[]>(
    () => generateUniqueKeys(count),
    [count]
  );

  const labels = getLabelsForLegend(selectedAlgorithm);

  return (
    <div className="relative h-[68vh] flex justify-center items-end">
      <Legend title={DEFAULT_LEGEND_LABEL} labels={labels} />
      {blocks.map(
        (
          { positionNumber, displayNumber, isSelected, isPivoted, isSorted },
          index
        ) => (
          <Block
            key={uniqueKeys[index]}
            positionNumber={positionNumber}
            displayNumber={displayNumber}
            isSelected={isSelected}
            isPivoted={isPivoted}
            isSorted={isSorted}
          />
        )
      )}
    </div>
  );
};

export default BlocksContainer;
