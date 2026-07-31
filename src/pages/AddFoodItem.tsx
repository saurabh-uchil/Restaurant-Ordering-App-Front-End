import { useState } from "react";
import FormCard from "../components/FormCard";
import MenuForm from "../components/MenuForm";
import axios from "axios";

const AddFoodItem = () => {

   const [uploadSuccess, setUploadSuccess] = useState(false);
   const [uploadError, setUploadError] = useState(false);
   const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (data) => {
    try{
      console.log("Submitting data:", data);
      setIsLoading(true);
      await axios.post("http://localhost:3000/menu/add-food-item", data);
      setUploadSuccess(true);
      setUploadError(false);
    } catch (error) {
      console.error("Error adding food item:", error);
      setUploadError(true);
      setUploadSuccess(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  return (
        <MenuForm onSubmit={handleSubmit} isLoading={isLoading} uploadSuccess={uploadSuccess} uploadError={uploadError} />  
  )
}

export default AddFoodItem
