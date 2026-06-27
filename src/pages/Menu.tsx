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
import axios from "axios";
import { useState } from "react";
import { Line } from "rc-progress";
import DragDrop from "../components/DragDrop";
import { Drawer } from "@mui/material";
import DrawerComponent from "../components/MenuDrawer";

const Menu = () => {

const {register, handleSubmit, setValue, control, formState: {errors}} = useForm();
const {fields, append, remove} = useFieldArray({control, name: "options"});
const {fields: addonFields, append: appendAddon, remove: removeAddon} = useFieldArray({control, name: "addons"});
const {fields: dietaryFields, append: appendDietary, remove: removeDietary} = useFieldArray({control, name: "dietaryAlternatives"});

const [progress, setProgress] = useState(0);
const [uploadSuccess, setUploadSuccess] = useState(false);
const [uploadError, setUploadError] = useState(false);

const [isOpen, setIsOpen] = useState(false);
const [drawerContent, setDrawerContent] = useState("");


const getShortcode = (name: string) => {
    const words = name.split(" ");
    const shortcode = words.map(word => word.charAt(0).toUpperCase()).join("");
    return shortcode;
}

const handleDrawerClose = () => {
    setIsOpen(false);
    setDrawerContent("");
}

const onSubmit = async (data: any) => {
    try{
        console.log(data);
      const {price} = data;
      
      // Convert price to a number before sending to the backend
      const updatedPrice = parseFloat(price);
      const updatedAddons = data.addons ? data.addons.map((addon: any) => ({name: addon.name, price: parseFloat(addon.price)})) : [];
      const updatedDietaryAlternatives = data.dietaryAlternatives ? data.dietaryAlternatives.map((alt: any) => ({name: alt.name, shortCode: getShortcode(alt.name), additionalPrice: parseFloat(alt.additionalPrice)})) : [];
      const updatedOptions = data.options ? data.options.map((option: any) => ({name: option.name, choices: option.choices ? option.choices.map((choice: any) => ({name: choice.name, extraCost: parseFloat(choice.extraCost)})) : []})) : []; 
      
      const updatedData = {...data, options: updatedOptions, addons: updatedAddons, dietaryAlternatives: updatedDietaryAlternatives, price: updatedPrice};


      const response =  await axios.post("http://localhost:3000/menu/test-add-food-item", updatedData);

      console.log(response.data);
      if(response.data.success){
        setUploadSuccess(true);
      }
    }
    catch(error: any){
        console.log(error)
        setUploadError(true);
    }
  }

const getPresignedUrl = async (file: File) => {
    const response = await axios.post("http://localhost:3000/image-uploader/presigned-url", {
            fileName: file.name,
            fileType: file.type
    });
    return response;
};
  

const handleImageUpload = async (file: File) => {
       
      /*   const file =  watch("image")?.[0];
        console.log(typeof file); */
        console.log(file);
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        
        const response = await getPresignedUrl(file);
        console.log(response.data);
        const{presignedUrl, imageUrl} = response.data;
        
        console.log(presignedUrl, imageUrl);

        await axios.put(presignedUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
            onUploadProgress: (progressEvent) => {                
                const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                setProgress(progress);
                // console.log(`Upload Progress: ${progress}%`);
            }
        });

        setValue("imageUrl", imageUrl);
        alert("Image uploaded successfully!");
    }

    const handleDrawerOpen = (content: string) => {
        setDrawerContent(content);
        setIsOpen(true);
    }


  return (
    <div className="flex flex-col md:flex-row gap-6">

        <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
            <DrawerComponent component={drawerContent} />
        </Drawer>
        
        {/* Form Component */}
        <div className="w-full md:w-3/5">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <Input id="name" type="text" label="Item name *" placeholder="Enter name" register={register} rules={{required: "Name is required"}} error={errors.name}/>
            </div>
            
            <div className="mb-3">
                <Textarea id="description" label="Description *" placeholder="Enter description" register={register} rules={{required: "Description is required"}} error={errors.description}/>
            </div>

            <div className="mb-3 flex gap-4">
                <div className="flex-1">
                    <Input id="price" type="number" label="Price *" placeholder="Enter price" register={register} rules={{ required: "Price is required", min: 0 }} error={errors.price}/>
                </div>

                <div className="flex-1">
                    <Select label="Course Type" name="course" register={register} rules={{ required: "Course Type is required" }} error={errors.course} options={["Entree", "Mains", "Dessert", "Kids"]} />
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
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => handleDrawerOpen("Options")} />
                    <Button type="button" text="Add Option Group" variant="secondary" icon={<MdAdd />} onClick={() => append({name: "", choices: [{name: "", extraCost: 0}]})}/>
               </div>
            </div>

            <div>
                <div>
                    {fields.map((group, index) => (
                            <div key={group.id} className="border border-gray-300 p-2 rounded mb-2">
                                
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-grow">
                                        <Input extraClass="w-full" label="" placeholder="Option Group Name" id={`options.${index}.name`} register={register} rules={{ required: "Option Group Name is required" }} type="text" />
                                    </div>
                                    <Button  type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => remove(index)} />
                                </div>
                                
                                <div className="mt-2 mb-2">
                                    <NestedOptions control={control} register={register} groupIndex={index} name="options" />
                                </div>
                            </div>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
                <Label label="Addons"/>
                 <div className="flex space-x-2">
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => handleDrawerOpen("Addons")} />
                    <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Addons" onClick={()=>{appendAddon({name: "", price: 0})}}/>
                 </div>
                
            </div>

            <div>
                {addonFields.map((field, index) => (
                    <div className="flex border border-gray-300 p-1 m-1 rounded items-center gap-2 bg-gray-100" key={field.id}>
                        <input className="flex-[2] border border-gray-300 p-1 bg-white rounded" {...register(`addons.${index}.name`)} placeholder="Addon Name" type="text" />
                        <input className="flex-[1] border border-gray-300 p-1 bg-white rounded" {...register(`addons.${index}.price`)} placeholder="Price" type="number" />
                        <Button type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => removeAddon(index)} />
                    </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between mb-3">
                <Label label="Dietary Alternatives"/>
                <div className="flex space-x-2">
                    <Button type="button" text="Browse Existing" variant="secondary" icon={<IoBook />} onClick={() => handleDrawerOpen("Dietary")} />
                    <Button type="button" variant="secondary" icon={<MdAdd />} text="Add Dietary Alternatives" onClick={()=>{appendDietary({name: "", additionalPrice:0})}}/>
                </div>
            </div>

            <div>
                {dietaryFields.map((field, index) => (
                    <div className="flex border border-gray-300 p-1 m-1 rounded items-center gap-2 bg-gray-100" key={field.id}>
                        <input className="flex-[2] border border-gray-300 p-1 bg-white rounded" {...register(`dietaryAlternatives.${index}.name`)} placeholder="Dietary Alternative Name" type="text" />
                        <input className="flex-[1] border border-gray-300 p-1 bg-white rounded" {...register(`dietaryAlternatives.${index}.additionalPrice`)} placeholder="Price" type="number" />
                        <Button type="button" classes="flex-none" variant="transparent" icon={<RiDeleteBin4Fill />} onClick={() => removeDietary(index)} />
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <CreatableInput name="removableIngredients" label="Removable Ingredients" control={control} options={["Tomato", "Cheese", "Basil"]} />
            </div>

            <div className="mb-3">
                <Label label="Available For Ordering"/>
                <Checkbox  label="Available" name="availability" value="available" register={register} />
                <Checkbox  label="Unavailable" name="availability" value="unavailable" register={register} />
            </div>

            <div>
                <input type="hidden" {...register("imageUrl")} />
            </div>

                <Button type="submit" text="Submit"  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200" />
            </form>
            {uploadError && <p className="text-red-600 bg-red-200 p-2 rounded text-center text-sm mt-4">Error uploading menu item. Please try again.</p>}
            {uploadSuccess && <p className="text-green-600 bg-green-200 p-2 rounded text-center text-sm mt-4">Image uploaded successfully!</p>}
        </div>


        {/* Image Upload Section */}
        <div className="w-full md:w-2/5">
            <DragDrop upload={handleImageUpload} setValue={setValue} name="imageUrl"/>
             {progress > 0 && progress < 100 && <Line percent={progress} strokeWidth={2} strokeColor="#b6b311"/> }
           {/*   <p className="text-red-600 bg-red-200 p-2 rounded text-center text-sm">Upload failed!</p> */}
             {progress === 100 &&  <p className="text-green-600 bg-green-200 p-2 rounded text-center text-sm">Upload complete!</p>}
        </div>

        
        
    </div>
  )
}

export default Menu
