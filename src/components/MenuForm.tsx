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
import Button from "./Button";
import { CheckCircle2, CircleAlert, Edit2, Plus, Trash2 } from "lucide-react";

type MenuFormProps = {
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
    handleDelete?: () => Promise<void>;
    error: any;
};

const MenuForm = ({onSubmit, initialData, isLoading, uploadSuccess, uploadError, handleDelete, error}: MenuFormProps) => {
    
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
            availability: initialData?.availability || [], 
            removableIngredients: initialData?.removableIngredients || [],
        }
    });
    
    const {isOpen, drawerContent, handleDrawerOpen, handleDrawerClose} = useMenuDrawerHook();
    
    const [dietaryAlternatives, setDietaryAlternatives] = useState(initialData?.dietaryAlternatives || []);
    const [addons, setAddons] = useState(initialData?.addons || []);
    const [optionGroups, setOptionGroups] = useState(initialData?.options || []);
    const [imageReset, setImageReset] = useState(false);

    const successMessage = initialData ? "Item updated successfully!" : "Item added successfully!";
    
    const handleFormSubmit = async (data) => {
        try {
            const updatedData = formattedData(data, dietaryAlternatives, addons, optionGroups); 
            await onSubmit(updatedData);

            if(!initialData){
                reset(); 
                setAddons([]);
                setDietaryAlternatives([]);
                setOptionGroups([]);
                setImageReset(true);
            }
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

    const getErrorMessage = (error: any) => {
        const message = error?.response?.data?.message;

        if (Array.isArray(message)) {
            return "Some information is invalid. Please check the form and try again.";
        }

        return message || "Something went wrong. Please try again.";
    };


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

                    <div className={addToMenuStyles.formActions}>
                        
                        <Button type="submit" text={initialData ? "Update Item" : "Add Item"} loadingText={initialData ? "Updating..." : "Adding..."} icon={initialData ? <Edit2 size={14} /> : <Plus size={14} />} variant="formPrimary" isLoading={isLoading} />

                        {initialData && (
                            <Button type="button" text="Delete" variant="formDanger" icon={<Trash2 size={14} />} onClick={handleItemDelete} />
                        )}

                    </div>
                   
                   {/* {isLoading && <LinearProgress className="mt-2 mb-2" aria-label="Loading…" />} */}
                   {/* {uploadSuccess && <p className={addToMenuStyles.successfulUploadMessage}>{successMessage}</p>}
                   {uploadError && <p className={addToMenuStyles.failedUploadMessage}>{errorMessage}</p>}
                    */}
                   {uploadSuccess && (
                    <div className={addToMenuStyles.successMessage}>
                        <CheckCircle2 size={16} className="shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                    )}

                    {uploadError && (
                    <div className={addToMenuStyles.errorMessage}>
                        <CircleAlert size={16} className="shrink-0" />
                        <span>
                        {getErrorMessage(error)}
                        </span>
                    </div>
)}
                </form>  
            </div>

            <UploadImage setValue={setValue} name="imageUrl" initialValue={initialData?.imageUrl} resetImage={imageReset} onResetComplete={() => setImageReset(false)}/>
        
        </div>

    </div>
  )
}

export default MenuForm
