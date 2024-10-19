import { FC } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IBlock from "@/interfaces/block";
import { getClassNameOnBlockCount } from "@/utils";

const Block: FC<IBlock> = ({
  positionNumber,
  displayNumber,
  isSelected,
  isPivoted,
  isSorted,
}) => {
  const blockCount = useSelector((state: RootState) => state.block.count);
  const className = getClassNameOnBlockCount(blockCount);

  return (
    <div
      className={classNames(
        "rounded-t-lg text-white flex items-center justify-center block border-2 border-b-0 border-white",
        className,
        {
          "bg-indigo-700": !isSelected && !isSorted && !isPivoted,
          "bg-purple-600": isSelected && !isSorted,
          "bg-fuchsia-700": isPivoted && !isSorted,
          "bg-emerald-600": isSorted,
          "block--text-removed": !displayNumber,
        }
      )}
      style={{
        height: `${positionNumber}%`,
      }}
    >
      {blockCount <= 30 && positionNumber}
    </div>
  );
};

export default Block;
