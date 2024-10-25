import { FC } from "react";
import { cn } from "@/lib/utils";
import { ILabelProps, ILegendProps } from "@/interfaces/legend";

const Label: FC<ILabelProps> = ({ className, label }) => (
  <div className="flex justify-between items-center w-full gap-y-4">
    <span className={cn("w-8 p-[8px] rounded-sm", className)} />
    <span className="w-16 text-slate-600 font-medium">{label}</span>
  </div>
);

const Legend: FC<ILegendProps> = ({ title, labels }) => {
  return (
    <div className="absolute top-0 left-8 w-[172px] bg-white p-4 flex-col border-2 border-gray-500 justify-between rounded-sm">
      <span className="text-slate-700 font-semibold">{title}</span>
      <div className="mt-4 flex flex-col gap-y-3 w-full">
        {labels.map(({ className, label }) => (
          <Label className={className} label={label} />
        ))}
      </div>
    </div>
  );
};

export default Legend;
