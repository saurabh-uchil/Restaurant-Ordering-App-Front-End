import CreatableInput from "./CreatableInput";

const MenuRemovableIngredients = ({control}) => {
  return (
     <div className="mb-3">
            <CreatableInput name="removableIngredients" label="Removable Ingredients" control={control} options={["Tomato", "Cheese", "Basil"]} />
     </div>
  )
}

export default MenuRemovableIngredients;
