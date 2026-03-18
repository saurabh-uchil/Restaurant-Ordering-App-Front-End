/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import Label from "../components/Label";
import Checkbox from "../components/Checkbox";
import Textarea from "../components/Textarea";
import CreatableInput from "../components/CreatableInput";
import Button from "../components/Button";
import NestedOptions from "../components/NestedOptions";
import { IoBook } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";



const Menu = () => {

const {register, handleSubmit, control, formState: {errors}} = useForm();
const {fields, append, remove} = useFieldArray({control, name: "optionGroups"});
const {fields: addonFields, append: appendAddon, remove: removeAddon} = useFieldArray({control, name: "addons"});
const {fields: dietaryFields, append: appendDietary, remove: removeDietary} = useFieldArray({control, name: "dietaryAlternatives"});

  const onSubmit = (data: any) => {
      console.log(data)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <Input id="name" type="text" label="Name" placeholder="Enter name" register={register} rules={{required: "Name is required"}} error={errors.name}/>
            </div>
            
            <div className="mb-3">
                <Textarea id="description" label="Description" placeholder="Enter description" register={register} rules={{required: "Description is required"}} error={errors.description}/>
            </div>

            <div className="mb-3 flex gap-4">
                <div className="flex-1">
                    <Input id="price" type="number" label="Price" placeholder="Enter price" register={register} rules={{ required: "Price is required", min: 0 }} error={errors.price}/>
                </div>

                <div className="flex-1">
                    <Select label="Course Type" name="menu" register={register} rules={{ required: "Course Type is required" }} error={errors.menu} options={["Entree", "Mains", "Dessert", "Kids"]} />
                </div>
            </div>

            <div className="mb-3">
                <Label label="Select Menu Type"/>
                <div className="flex items-center justify-between">
                    <Checkbox label="Breakfast" name="menuType" value="breakfast" register={register} rules={{
                        validate: (value) =>
                        value?.length > 0 || "Select a menu type"
                    }} error={errors.menuType}/>
                    <Checkbox label="Lunch" name="menuType" value="lunch" register={register} />
                    <Checkbox label="Dinner" name="menuType" value="dinner" register={register} />
                </div>
            </div>
                
            <div className="flex items-center justify-between mb-3">
                <Label label="Option Groups"/>
               <div className="flex space-x-2">
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />}/>
                    <Button type="button" text="Add Option Group" variant="secondary" icon={<MdAdd />} onClick={() => append({optionGroupName: "", options: [{optionName: "", price: 0}]})}/>
               </div>
            </div>

            <div>
                <div>
                    {fields.map((group, index) => (
                            <div key={group.id} className="border border-gray-300 p-2 rounded mb-2">
                                
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-grow">
                                        <Input extraClass="w-full" label="" placeholder="Option Group Name" id={`optionGroups.${index}.optionGroupName`} register={register} rules={{ required: "Option Group Name is required" }} type="text" />
                                    </div>
                                    <Button  type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
                                </div>
                                
                                <div className="mt-2 mb-2">
                                    <NestedOptions control={control} register={register} groupIndex={index} name="optionGroups" />
                                </div>
                            </div>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
                <Label label="Addons"/>
                <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Addons" onClick={()=>{appendAddon({addonName: "", price: 0})}}/>
            </div>

            <div>
                {addonFields.map((field, index) => (
                    <div className="flex border border-gray-300 p-1 m-1 rounded items-center gap-2 bg-gray-100" key={field.id}>
                        <input className="flex-[2] border border-gray-300 p-1 bg-white rounded" {...register(`addons.${index}.addonName`)} placeholder="Addon Name" type="text" />
                        <input className="flex-[1] border border-gray-300 p-1 bg-white rounded" {...register(`addons.${index}.price`)} placeholder="Price" type="number" />
                        <Button type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => removeAddon(index)} />
                    </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between mb-3">
                <Label label="Dietary Alternatives"/>
                <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Dietary Alternatives" onClick={()=>{appendDietary({dietaryName: "", price:0})}}/>
            </div>

            <div>
                {dietaryFields.map((field, index) => (
                    <div className="flex border border-gray-300 p-1 m-1 rounded items-center gap-2 bg-gray-100" key={field.id}>
                        <input className="flex-[2] border border-gray-300 p-1 bg-white rounded" {...register(`dietaryAlternatives.${index}.dietaryName`)} placeholder="Dietary Alternative Name" type="text" />
                        <input className="flex-[1] border border-gray-300 p-1 bg-white rounded" {...register(`dietaryAlternatives.${index}.price`)} placeholder="Price" type="number" />
                        <Button type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => removeDietary(index)} />
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <CreatableInput name="removableIngredients" label="Removable Ingredients" control={control} options={["Tomato", "Cheese", "Basil"]} />
            </div>

            <div className="mb-3">
                <Checkbox  label="Available For Ordering" name="availability" value="available" register={register} />
            </div>

            <Button type="submit" text="Submit"  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200" />
        </form>
    </div>
  )
}

export default Menu
