/* eslint-disable react-hooks/set-state-in-effect */
import { RiDeleteBin4Fill } from "react-icons/ri";
import Button from "./Button";
import Input from "./Input";
import NestedOptions from "./NestedOptions";
import { addToMenuStyles } from "../styles/addToMenu";


const OptionsDiv = ({fields, register, remove, control, formState}) => {
    const {errors} = formState
    /* const { errors, submitCount } = formState; */
   /*  const [renderKey, setRenderKey] = useState(0); */
    
    /* Updating the renderKey to force re-render of the component when submitCount changes, 
    this is to ensure that the validation errors are displayed correctly for dynamically added fields*/
    
    /* useEffect(() => {
        if (submitCount > 0) {
            setRenderKey(prev => prev + 1);
        }
    }, [submitCount]); */


    const options = fields.map((group, index) =>{
                    return (
                            <div key={group.id} className={addToMenuStyles.fieldDiv}>
                                
                                <div className={addToMenuStyles.fieldInnerDiv}>
                                    <div className={addToMenuStyles.fieldInputContainer}>
                                        <Input extraClass={addToMenuStyles.fieldGroupNameInput} label="" placeholder="Option Group Name" id={`options.${index}.name`} register={register} rules={{ required: "Option Group Name is required" }} type="text" error={errors.options?.[index]?.name} />
                                    </div>
                                    <Button type="button" classes={addToMenuStyles.deleteButton} variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
                                </div>
                                
                                <div className={addToMenuStyles.nestedfieldContainer}>
                                    <NestedOptions control={control} register={register} groupIndex={index} name="options" />
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
