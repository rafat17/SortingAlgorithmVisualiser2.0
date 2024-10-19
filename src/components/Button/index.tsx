import { FC, ReactNode } from "react";
import classNames from "classnames";
import "./styles.scss";

interface IButtonProps {
  label: ReactNode | string;
  onClick: () => void;
  disabled: boolean;
}

const Button: FC<IButtonProps> = ({ onClick, label, disabled }) => (
  <button
    onClick={onClick}
    className={classNames(
      "Button max-w-[80px] h-[30px] text-sm bg-white rounded",
      {
        "is-disabled": disabled,
      }
    )}
  >
    {label}
  </button>
);

export default Button;
