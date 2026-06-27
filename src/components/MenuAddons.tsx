import { IoBook } from "react-icons/io5";
import Button from "./Button";
import Label from "./Label";
import { MdAdd } from "react-icons/md";
import { useFieldArray } from "react-hook-form";
import { addToMenuStyles } from "../styles/addToMenu";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import SelectedExisting from "./SelectedExisting";

const MenuAddons = ({control, register, formState, drawerOpen, selectedAddons, setSelectedAddons}) => {

  const {append, remove, fields} = useFieldArray({
    control,
    name: "addons"
  });

  const addons = fields.map((field, index) => (
                    <div className={addToMenuStyles.fieldDiv} key={field.id}>
                        <div className={addToMenuStyles.fieldInnerDiv}>
                            <Input label="" extraClass={addToMenuStyles.fieldInputContainer} register={register} id={`addons.${index}.name`} placeholder="Addon Name" type="text" />
                            <Input label="" extraClass={addToMenuStyles.fieldInputContainer} register={register} id={`addons.${index}.price`} placeholder="Price" type="number" />
                            <Button type="button" classes={addToMenuStyles.deleteButton} variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
                        </div>
                    </div>
                ))
                
  return (
    <div>
      <div className={addToMenuStyles.dynamicFieldContainer}>
                <Label label="Addons"/>
                 <div className={addToMenuStyles.dynamicFieldButtons}>
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => drawerOpen("Addons")} />
                    <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Addons" onClick={()=>{append({name: "", price: 0})}}/>
                 </div>
      </div>

      <SelectedExisting label="Addons" selectedItems={selectedAddons} setSelectedItems={setSelectedAddons} />
            
      <div>
          {addons}
      </div>
    </div>
  )
}

export default MenuAddons
