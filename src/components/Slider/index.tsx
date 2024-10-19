import { FC } from "react";
import classNames from "classnames";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import "./index.scss";

type AdditionalProps = {
  labelClassName?: string;
  className?: string;
  label: string;
};

type SliderProps = React.ComponentProps<typeof Slider>;

type CombinedProps = SliderProps & AdditionalProps;

const SliderComponent: FC<CombinedProps> = ({
  defaultValue,
  labelClassName,
  className,
  label,
  disabled,
  min,
  max,
  step,
  ...props
}) => {
  return (
    <>
      {label && (
        <span
          className={classNames(
            cn("SliderLabel w-[40%] text-white", labelClassName),
            {
              disabled,
            }
          )}
        >
          {label}
        </span>
      )}
      <Slider
        className={classNames(
          cn(
            "SliderRoot relative flex h-5 touch-none select-none items-center",
            className
          ),
          { "w-[60%]": label, "w-[100%]": !label }
        )}
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
        {...props}
      />
    </>
  );
};

export default SliderComponent;
