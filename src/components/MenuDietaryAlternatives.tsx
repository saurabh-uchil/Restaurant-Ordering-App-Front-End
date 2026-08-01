import { useFieldArray } from "react-hook-form";
import Button from "./Button";
import { MdAdd } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { addToMenuStyles } from "../styles/addToMenu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import SelectedExisting from "./SelectedExisting";
import { Leaf } from "lucide-react";

const MenuDietaryAlternatives = ({
  register,
  control,
  formState,
  drawerOpen,
  selectedDietaryAlternatives,
  setSelectedDietaryAlternatives,
}) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: "dietaryAlternatives",
  });

  const dietaryAlternativesList = fields.map((field, index) => (
    <div className={addToMenuStyles.fieldDiv} key={field.id}>
      <div className={addToMenuStyles.fieldInnerDiv}>
        <div className={addToMenuStyles.fieldInputContainer}>
          <Input
            register={register}
            id={`dietaryAlternatives.${index}.name`}
            placeholder="Dietary Alternative Name"
            type="text"
            rules={{
              required: "Dietary alternative name is required",
            }}
            error={formState.errors?.dietaryAlternatives?.[index]?.name}
          />
        </div>

        <div className={addToMenuStyles.fieldInputContainer}>
          <Input
            register={register}
            id={`dietaryAlternatives.${index}.additionalPrice`}
            placeholder="Price"
            type="number"
          />
        </div>

        <div className={addToMenuStyles.deleteButtonContainer}>
          <Button
            type="button"
            classes={addToMenuStyles.deleteBtn}
            variant="transparent"
            icon={<RiDeleteBin4Fill />}
            onClick={() => remove(index)}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={addToMenuStyles.dynamicFieldContainer}>
        <div className={addToMenuStyles.dynamicFieldTitle}>
          <div className={addToMenuStyles.sectionIcon}>
            <Leaf size={14} />
          </div>
          <p className={addToMenuStyles.sectionTitle}>Dietary Alternatives</p>
        </div>
        <div className={addToMenuStyles.dynamicFieldButtons}>
          <Button
            type="button"
            text="Browse Existing"
            variant="secondary"
            icon={<IoBook />}
            onClick={() => drawerOpen("Dietary")}
          />
          <Button
            type="button"
            variant="secondary"
            icon={<MdAdd />}
            text="Add Dietaries"
            onClick={() => {
              append({ name: "", additionalPrice: 0 });
            }}
          />
        </div>
      </div>

      <SelectedExisting
        label="Dietary Alternatives"
        selectedItems={selectedDietaryAlternatives}
        setSelectedItems={setSelectedDietaryAlternatives}
      />

      <div>{dietaryAlternativesList}</div>
    </div>
  );
};

export default MenuDietaryAlternatives;
