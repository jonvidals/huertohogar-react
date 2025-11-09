import * as React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { getAllProducts } from "../../services/productService";

interface Props {
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

const CategoryBar: React.FC<Props> = ({ selected, onSelect }) => {
  const categoriasUnicas = Array.from(
    new Set(getAllProducts().map((p) => p.category))
  );

  return (
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
      <Button
        variant={!selected ? "primary" : "outline-primary"}
        onClick={() => onSelect(null)}
      >
        Todas
      </Button>
      {categoriasUnicas.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "primary" : "outline-primary"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default CategoryBar;
