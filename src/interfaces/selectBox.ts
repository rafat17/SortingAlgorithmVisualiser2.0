type optionsType = { value: string; label: string };

interface ISelectBox {
  disabled: boolean;
  value: string;
  onValueChange: (value: string) => void;
  options: optionsType[];
  placeholderText?: string;
  defaultValue?: string;
}

export default ISelectBox;
