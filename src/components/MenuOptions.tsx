import { IoBook } from "react-icons/io5";
import Button from "./Button";
import Label from "./Label";
import { MdAdd } from "react-icons/md";
import { addToMenuStyles } from "../styles/addToMenu";
import OptionsDiv from "./OptionsDiv";
import { useFieldArray } from "react-hook-form";
import SelectedExisting from "./SelectedExisting";

const MenuOptions = ({register, control, formState, drawerOpen, selectedOptionGroups, setSelectedOptionGroups}) => {
    
    const { append, remove, fields } = useFieldArray({
    control,
    name: "options"
  });

    
  return (
      <div>
        <div className={addToMenuStyles.dynamicFieldContainer}>
               <Label label="Option Groups"/>
               <div className={addToMenuStyles.dynamicFieldButtons}>
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => drawerOpen("Options")} />
                    <Button type="button" text="Add Option Group" variant="secondary" icon={<MdAdd />} onClick={() => append({name: "", choices: [{name: "", extraCost: 0}]})}/>
               </div>
        </div>
        <SelectedExisting label="Option Groups" selectedItems={selectedOptionGroups} setSelectedItems={setSelectedOptionGroups} />
        <OptionsDiv fields={fields} register={register} remove={remove} control={control} formState={formState} />
      </div>
  )
}

export default MenuOptions
