/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, LinearProgress } from "@mui/material";
import MenuDrawer from "./MenuDrawer";
import BasicInfo from "./BasicInfo";
import MenuOptions from "./MenuOptions";
import MenuAddons from "./MenuAddons";
import MenuDietaryAlternatives from "./MenuDietaryAlternatives";
import MenuRemovableIngredients from "./MenuRemovableIngredients";
import AddAvailability from "./AddAvailability";
import { addToMenuStyles } from "../styles/addToMenu";
import UploadImage from "./UploadImage";
import { useState } from "react";
import useMenuDrawerHook from "../hooks/useMenuDrawerHook";
import { useForm } from "react-hook-form";
import { formattedData } from "../services/dataFormatterService";

type MenuFormProps = {
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
    handleDelete?: () => Promise<void>;
};

const MenuForm = ({onSubmit, initialData, isLoading, uploadSuccess, uploadError, handleDelete}: MenuFormProps) => {
    
   const {register, handleSubmit, formState, control, setValue, reset} = useForm({mode: "all",
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            course: initialData?.course || "",
            menuType: initialData?.menuType || [],
            imageUrl: initialData?.imageUrl || "",
            addons: [],
            dietaryAlternatives: [],
            options: [],
            availability: initialData?.availability || {}, 
            removableIngredients: initialData?.removableIngredients || [],
        }
    });
    
    const {isOpen, drawerContent, handleDrawerOpen, handleDrawerClose} = useMenuDrawerHook();
    
    const [dietaryAlternatives, setDietaryAlternatives] = useState(initialData?.dietaryAlternatives || []);
    const [addons, setAddons] = useState(initialData?.addons || []);
    const [optionGroups, setOptionGroups] = useState(initialData?.options || []);

    const successMessage = initialData ? "Item updated successfully!" : "Item added successfully!";
    const errorMessage = initialData ? "Error updating item. Please try again." : "Error adding item. Please try again.";

    const handleFormSubmit = async (data) => {
        try {
            const updatedData = formattedData(data, dietaryAlternatives, addons, optionGroups); 
            await onSubmit(updatedData);
            reset(); 
            setAddons([]);
            setDietaryAlternatives([]);
            setOptionGroups([]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemDelete = async () => {
        try{
            if(handleDelete){
                await handleDelete();
                reset(); 
                setAddons([]);
                setDietaryAlternatives([]);
                setOptionGroups([]);
            }
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <div>
        <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
            <MenuDrawer component={drawerContent} dietaryAlternatives={dietaryAlternatives} setDietaryAlternatives={setDietaryAlternatives} addons={addons} setAddons={setAddons} optionGroups={optionGroups} setOptionGroups={setOptionGroups} />
        </Drawer>

        <div className={addToMenuStyles.container}>
            <div className={addToMenuStyles.form}>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                   
                   <BasicInfo register={register} formState={formState} />
                   <MenuOptions control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedOptionGroups={optionGroups} setSelectedOptionGroups={setOptionGroups} />
                   <MenuAddons control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedAddons={addons} setSelectedAddons={setAddons} />
                   <MenuDietaryAlternatives control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedDietaryAlternatives={dietaryAlternatives} setSelectedDietaryAlternatives={setDietaryAlternatives} />
                   <MenuRemovableIngredients control={control} />
                   <AddAvailability register={register} formState={formState} />

                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" >
                     Submit
                   </button>

                   {initialData && (
                     <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleItemDelete}>
                       Delete
                     </button>
                   )}
                   
                   {isLoading && <LinearProgress className="mt-2 mb-2" aria-label="Loading…" />}
                   {uploadSuccess && <p className={addToMenuStyles.successfulUploadMessage}>{successMessage}</p>}
                   {uploadError && <p className={addToMenuStyles.failedUploadMessage}>{errorMessage}</p>}
                
                </form>  
            </div>

            <UploadImage setValue={setValue} name="imageUrl" initialValue={initialData?.imageUrl} />
        
        </div>

    </div>
  )
}

export default MenuForm
