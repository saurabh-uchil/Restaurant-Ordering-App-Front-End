/* eslint-disable react-hooks/set-state-in-effect */
import { RiDeleteBin4Fill } from "react-icons/ri";
import Input from "./Input";
import NestedOptions from "./NestedOptions";
import { addToMenuStyles } from "../styles/addToMenu";

const OptionsDiv = ({fields, register, remove, control, formState}) => {
    const {errors} = formState


    const options = fields.map((group, index) =>{
        return (
            <div key={group.id} className={addToMenuStyles.fieldDiv}>
                                
                <div className={addToMenuStyles.fieldInnerDiv}>
                    
                    <div className={addToMenuStyles.fieldInputContainer}>
                        <Input extraClass={addToMenuStyles.fieldGroupNameInput} label="" placeholder="Option Group Name" id={`options.${index}.name`} register={register} rules={{ required: "Option Group Name is required" }} type="text" error={errors.options?.[index]?.name} />
                    </div>

                    <button type="button" className={addToMenuStyles.deleteIcon} onClick={() => remove(index)} aria-label="Delete option group" >
                        <RiDeleteBin4Fill size={16} />
                    </button>

                </div>
                                
                <div className={addToMenuStyles.nestedfieldContainer}>
                    <NestedOptions control={control} register={register} groupIndex={index} name="options" formState={formState} />
                </div>
                            
                            
            </div>
            )
        })

  return (
        <div>
            {options}
        </div>
  )
}

export default OptionsDiv
