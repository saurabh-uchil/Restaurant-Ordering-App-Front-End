import { Drawer, LinearProgress } from "@mui/material";
import AddAvailability from "../components/AddAvailability";
import BasicInfo from "../components/BasicInfo";
import FormCard from "../components/FormCard";
import MenuAddons from "../components/MenuAddons";
import MenuDietaryAlternatives from "../components/MenuDietaryAlternatives";
import MenuOptions from "../components/MenuOptions";
import MenuRemovableIngredients from "../components/MenuRemovableIngredients";
import useAddToFormHook from "../hooks/useAddToFormHook";
import { addToMenuStyles } from "../styles/addToMenu";
import useMenuDrawerHook from "../hooks/useMenuDrawerHook";
import MenuDrawer from "../components/MenuDrawer";
import useGetExistingDataHook from "../hooks/useGetExistingDataHook";
import UploadImage from "../components/UploadImage";
import { formattedData } from "../services/dataFormatterService";
import axios from "axios";
import { useState } from "react";

const AddToMenu = () => {

    const methods = useAddToFormHook();
    const {register, handleSubmit, formState, control, setValue, reset} = methods;
    const {isOpen, drawerContent, handleDrawerOpen, handleDrawerClose} = useMenuDrawerHook();
    const {existingData: dietaryAlternatives, setExistingData: setDietaryAlternatives, clearExistingData: clearDietaryAlternatives} = useGetExistingDataHook();
    const {existingData: addons, setExistingData: setAddons, clearExistingData: clearAddons} = useGetExistingDataHook();
    const {existingData: optionGroups, setExistingData: setOptionGroups, clearExistingData: clearOptionGroups} = useGetExistingDataHook();
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
     
    const onSubmit = async (data) => {
        try{
            setIsLoading(true);
            const updatedData = formattedData(data, dietaryAlternatives, addons, optionGroups); 
           
            await axios.post("http://localhost:3000/menu/test-add-food-item", updatedData);
            
            setIsLoading(false);
            setUploadSuccess(true);
            reset();
            clearDietaryAlternatives();
            clearAddons();
            clearOptionGroups();
            setUploadError(false);

        }catch(error){
            setIsLoading(false);
            setUploadSuccess(false);
            setUploadError(true);
            console.log(error.response?.data || error.message);
        }
        
    }
  
    return (
    
      <FormCard title="Add to Menu">

        <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
            <MenuDrawer component={drawerContent} dietaryAlternatives={dietaryAlternatives} setDietaryAlternatives={setDietaryAlternatives} addons={addons} setAddons={setAddons} optionGroups={optionGroups} setOptionGroups={setOptionGroups} />
        </Drawer>

        <div className={addToMenuStyles.container}>
            <div className={addToMenuStyles.form}>

                <form onSubmit={handleSubmit(onSubmit)}>
                   <BasicInfo register={register} formState={formState} />
                   <MenuOptions control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedOptionGroups={optionGroups} setSelectedOptionGroups={setOptionGroups} />
                   <MenuAddons control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedAddons={addons} setSelectedAddons={setAddons} />
                   <MenuDietaryAlternatives control={control} register={register} formState={formState} drawerOpen={handleDrawerOpen} selectedDietaryAlternatives={dietaryAlternatives} setSelectedDietaryAlternatives={setDietaryAlternatives} />
                   <MenuRemovableIngredients control={control} />
                   <AddAvailability register={register} formState={formState} />
                   <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" >
                     Submit
                   </button>
                   
                   {isLoading && <LinearProgress className="mt-2 mb-2" aria-label="Loading…" />}
                   {uploadSuccess && <p className={addToMenuStyles.successfulUploadMessage}>Item added successfully!</p>}
                   {uploadError && <p className={addToMenuStyles.failedUploadMessage}>Error adding item. Please try again.</p>}
                </form>  
            </div>

            <UploadImage setValue={setValue} name="imageUrl"/>
        </div>
      </FormCard>
    
  )
}

export default AddToMenu
