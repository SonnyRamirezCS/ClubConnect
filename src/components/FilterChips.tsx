import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const FilterChips = ({ categories, selected, onSelect }: FilterChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selected === "all" ? "default" : "outline"}
        className="cursor-pointer px-4 py-2 transition-all hover:scale-105"
        onClick={() => onSelect("all")}
      >
        All Clubs
      </Badge>
      
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selected === category ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 transition-all hover:scale-105"
          onClick={() => onSelect(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default FilterChips;
