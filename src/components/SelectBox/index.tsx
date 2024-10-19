import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ISelectBox from "@/interfaces/selectBox";
import "./styles.scss";

const SelectBox: FC<ISelectBox> = ({
  disabled,
  value,
  onValueChange,
  options,
  placeholderText,
  defaultValue,
}) => (
  <Select
    disabled={disabled}
    value={value}
    onValueChange={onValueChange}
    defaultValue={defaultValue}
  >
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={placeholderText} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default SelectBox;
