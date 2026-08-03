import { useState } from "react";
import MenuForm from "../components/MenuForm";
import axios from "axios";
import { useAuth, useCurrentUser } from "../store/authStore";

const AddFoodItem = () => {

   const [uploadSuccess, setUploadSuccess] = useState(false);
   const [uploadError, setUploadError] = useState(false);
   const [isLoading, setIsLoading] = useState(false); 

   const currentUser = useCurrentUser((state) => state.currentUser);


  const handleSubmit = async (data) => {
    try{
      console.log(currentUser);
      console.log("Submitting data:", data);
      setIsLoading(true);
      if(currentUser && currentUser.restaurant){
      await axios.post("http://localhost:3000/menu/add-food-item", { ...data, restaurant_Id: currentUser.restaurant });
      setUploadSuccess(true);
      setUploadError(false);
    }
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
