import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const BodyContainer: FC<IProps> = ({ children }) => (
  <div className="h-lvh flex flex-col justify-between">{children}</div>
);

export default BodyContainer;
