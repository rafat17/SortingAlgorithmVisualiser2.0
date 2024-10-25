import { ReactNode } from "react";

export interface ILabelProps {
  className?: string;
  label: string | ReactNode;
}

export interface ILegendProps {
  title: string | ReactNode;
  labels: ILabelProps[];
}
