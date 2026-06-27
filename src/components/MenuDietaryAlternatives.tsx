import { useFieldArray } from "react-hook-form";
import Label from "./Label";
import Button from "./Button";
import { MdAdd } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { addToMenuStyles } from "../styles/addToMenu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import SelectedExisting from "./SelectedExisting";

const MenuDietaryAlternatives = ({register, control, formState, drawerOpen, selectedDietaryAlternatives, setSelectedDietaryAlternatives}) => {

    const { append, remove, fields } = useFieldArray({
    control,
    name: "dietaryAlternatives"
  });

  
    const dietaryAlternativesList = fields.map((field, index) => (
                    <div className={addToMenuStyles.fieldDiv} key={field.id}>
                        <div className={addToMenuStyles.fieldInnerDiv}>
                            <Input label="" extraClass={addToMenuStyles.fieldInputContainer} register={register} id={`dietaryAlternatives.${index}.name`} placeholder="Dietary Alternative Name" type="text" />
                            <Input label="" extraClass={addToMenuStyles.fieldInputContainer} register={register} id={`dietaryAlternatives.${index}.additionalPrice`} placeholder="Price" type="number" />
                            <Button type="button" classes={addToMenuStyles.deleteButton} variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
                        </div>
                    </div>
                ))

  return (
    <div>
      <div className={addToMenuStyles.dynamicFieldContainer}>
                <Label label="Dietaries"/>
                <div className={addToMenuStyles.dynamicFieldButtons}>
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => drawerOpen("Dietary")} />
                    <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Dietaries" onClick={()=>{append({name: "", additionalPrice:0})}}/>
                </div>
                
            </div>
            
            <SelectedExisting label="Dietary Alternatives" selectedItems={selectedDietaryAlternatives} setSelectedItems={setSelectedDietaryAlternatives} />
            
            <div>
                {dietaryAlternativesList}
            </div>
    </div>
  )
}

export default MenuDietaryAlternatives
