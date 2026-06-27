/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UseFormRegister } from "react-hook-form";
import { AVAILABILITY_OPTIONS } from "../constants/addToMenuConstants";
import Checkbox from "./Checkbox";
import Label from "./Label";
import { addToMenuStyles } from "../styles/addToMenu";

type AddAvailabilityProps = {
    register: UseFormRegister<any>;
    formState: any;
}


const AddAvailability = ({register, formState}: AddAvailabilityProps) => {

const availabilityOptions = AVAILABILITY_OPTIONS.map((option, index) => {
    return <Checkbox key={index} label={option.label} name="availability" value={option.value} register={register} />
});

  return (
    <div>
      <div className={addToMenuStyles.inputs}>
                <Label label="Available For Ordering"/>
                {availabilityOptions}
            </div>
    </div>
  )
}

export default AddAvailability
