import Button from "./Button";
import { MdAdd } from "react-icons/md";
import { useFieldArray } from "react-hook-form";
import { addToMenuStyles } from "../styles/addToMenu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import SelectedExisting from "./SelectedExisting";
import { Puzzle } from "lucide-react";
import { IoBook } from "react-icons/io5";

const MenuAddons = ({
  control,
  register,
  formState,
  drawerOpen,
  selectedAddons,
  setSelectedAddons,
}) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: "addons",
  });

  const addons = fields.map((field, index) => (
    <div className={addToMenuStyles.fieldDiv} key={field.id}>
      <div className={addToMenuStyles.fieldInnerDiv}>
        <div className={addToMenuStyles.fieldInputContainer}>
          <Input
            label=""
            register={register}
            id={`addons.${index}.name`}
            placeholder="Addon Name"
            type="text"
            rules={{
              required: "Addon name is required",
            }}
            error={formState.errors?.addons?.[index]?.name}
          />
        </div>

        <div className={addToMenuStyles.fieldInputContainer}>
          <Input
            label=""
            register={register}
            id={`addons.${index}.price`}
            placeholder="Price"
            type="number"
            rules={{
              required: "Price is required",
              min: {
                value: 0,
                message: "Price cannot be negative",
              },
            }}
            error={formState.errors?.addons?.[index]?.price}
          />
        </div>

        <div className={addToMenuStyles.deleteButtonContainer}>
          <Button
            type="button"
            classes={addToMenuStyles.deleteButton}
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
            <Puzzle size={14} />
          </div>
          <p className={addToMenuStyles.sectionTitle}>Addons</p>
        </div>
        <div className={addToMenuStyles.dynamicFieldButtons}>
          <Button
            type="button"
            text="Browse Existing"
            variant="form"
            icon={<IoBook />}
            onClick={() => drawerOpen("Addons")}
          />
          <Button
            type="button"
            variant="form"
            icon={<MdAdd />}
            text="Add Addons"
            onClick={() => {
              append({ name: "", price: 0 });
            }}
          />
        </div>
      </div>

      <SelectedExisting
        label="Addons"
        selectedItems={selectedAddons}
        setSelectedItems={setSelectedAddons}
      />

      <div>{addons}</div>
    </div>
  );
};

export default MenuAddons;
