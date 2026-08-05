/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer } from "@mui/material";
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
import { generalErrorMessage, invalidInfoMessage, successMsg } from "../data/validationMessages";

type MenuFormProps = {
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isSubmitting?: boolean;
    submitSuccess?: boolean;
    submitError?: boolean;
    submitErrorData?: any;

    handleDelete?: () => Promise<void>;
    isDeleting?: boolean;
    deleteError?: boolean;
    deleteErrorData?: any;
};

const MenuForm = ({onSubmit, initialData, isSubmitting, submitSuccess, submitError, submitErrorData, handleDelete, isDeleting, deleteError, deleteErrorData}: MenuFormProps) => {
    
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

    const successMessage = initialData ? successMsg.edit : successMsg.add;
    
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

    const getErrorMessage = (error: any) => {
        const message = error?.response?.data?.message;

        if (Array.isArray(message)) {
            return invalidInfoMessage;
        }

        return message || generalErrorMessage;
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
                        
                        <Button type="submit" text={initialData ? "Update Item" : "Add Item"} loadingText={initialData ? "Updating..." : "Adding..."} icon={initialData ? <Edit2 size={14} /> : <Plus size={14} />} variant="formPrimary" isLoading={isSubmitting} />

                        {initialData && (
                            <Button type="button" text="Delete" variant="formDanger" icon={<Trash2 size={14} />} onClick={handleDelete} />
                        )}

                    </div>
                   
                   {submitSuccess && (
                    <div className={addToMenuStyles.successMessage}>
                        <CheckCircle2 size={16} className={addToMenuStyles.buttonIcons} />
                        <span>{successMessage}</span>
                    </div>
                    )}

                    {submitError && (
                    <div className={addToMenuStyles.errorMessage}>
                        <CircleAlert size={16} className={addToMenuStyles.buttonIcons} />
                        <span>{getErrorMessage(submitErrorData)}</span>
                    </div>
                    )}

                    {deleteError && (
                    <div className={addToMenuStyles.errorMessage}>
                        <CircleAlert size={16} className={addToMenuStyles.buttonIcons} />
                        <span>{getErrorMessage(deleteErrorData)}</span>
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
