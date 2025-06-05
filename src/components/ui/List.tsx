import type { ListProps } from "../../types/types";
import Checkbox from "./Checkbox";
import { Pencil, X } from "lucide-react";

function List({ id, title, isChecked, onUpdate, onDelete }: ListProps) {
  const iconClassName = "w-5 h-5"
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Checkbox checked={isChecked} onChange={() => {}} />
        <p
          className={`text-sm ${
            isChecked ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {title}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="tooltip cursor-pointer" data-tip="Update">
          <Pencil onClick={() => onUpdate(id)} className={iconClassName} />
        </div>
        <div className="tooltip cursor-pointer" data-tip="Delete">
          <X onClick={() => onDelete(id)} className={iconClassName} />
        </div>
      </div>
    </div>
  );
}

export default List;
