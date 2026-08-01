import { CircleSlash } from "lucide-react";
import CreatableInput from "./CreatableInput";

const MenuRemovableIngredients = ({control}) => {
  return (
     <div className="mb-3">
            <CreatableInput name="removableIngredients" label="Removable Ingredients" icon={CircleSlash}control={control} options={["Tomato", "Cheese", "Basil"]} />
     </div>
  )
}

export default MenuRemovableIngredients;
