/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from "react-hook-form";
import Input from "./Input";
import Textarea from "./Textarea";
import { addToMenuStyles } from "../styles/addToMenu";
import Select from "./Select";
import { MENU_TYPES } from "../constants/addToMenuConstants";
import Checkbox from "./Checkbox";
import Label from "./Label";


type BasicInfoProps = {
    register: UseFormRegister<any>;
    formState: any;
}

const BasicInfo = ({register, formState}: BasicInfoProps) => {
  const {errors} = formState;

  const menuChoiceRules = {
    validate: (value: any) =>
      value?.length > 0 || "Select a menu type"
  };

  const menuChoice = MENU_TYPES.map((menu, index) => {
     if(index === 0){
     return <Checkbox key={index}label="Breakfast" name="menuType" value="breakfast" register={register} rules={menuChoiceRules} error={errors.menuType}/>
    }  
    return <Checkbox key={index} label={menu.label} name="menuType" value={menu.value} register={register} />
  });


  return (
    <div>
          <div className={addToMenuStyles.inputs}>
                <Input id="name" type="text" label="Item name *" placeholder="Enter name" register={register} rules={{required: "Name is required"}} error={errors?.name}/>
          </div>
            
          <div className={addToMenuStyles.inputs}>
                <Textarea id="description" label="Description *" placeholder="Enter description" register={register} rules={{required: "Description is required"}} error={errors.description}/>
          </div>

           <div className={addToMenuStyles.priceCourseContainer}>
                <div className={addToMenuStyles.priceInput}>
                    <Input id="price" type="number" label="Price *" placeholder="Enter price" register={register} rules={{ required: "Price is required", min: 0 }} error={errors.price}/>
                </div>

                <div className={addToMenuStyles.courseSelect}>
                    <Select label="Course Type" name="course" register={register} rules={{ required: "Course Type is required" }} error={errors.course} options={["Entree", "Mains", "Dessert", "Kids"]} />
                </div>
            </div>

            <div className={addToMenuStyles.inputs}>
                <Label label="Menu Type *" />
                <div className={addToMenuStyles.menuTypeCheckBox}>
                    {menuChoice}
                </div>
            </div>
    </div>
  )
}

export default BasicInfo
