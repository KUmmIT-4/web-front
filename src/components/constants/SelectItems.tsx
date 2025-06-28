import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  placeholder: string;
  options: { value: string; label: string }[];
  onValueChange?: (value: string) => void;
}

const SelectItems = ({ placeholder, options, onValueChange }: SelectProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="flex-1 !h-13 !bg-white !border-[var(--border-line)]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectItems;
