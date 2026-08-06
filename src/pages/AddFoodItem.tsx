
import MenuForm from "../components/MenuForm";

import { useCurrentUser } from "../store/authStore";
import { useAddItem } from "../api/apihooks/useMenu";

const AddFoodItem = () => {

   /* const [uploadSuccess, setUploadSuccess] = useState(false);
   const [uploadError, setUploadError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);  */

   const currentUser = useCurrentUser((state) => state.currentUser);


  /* const handleSubmit = async (data) => {
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
  }; */

  const {mutateAsync, isPending, isError, isSuccess, error} = useAddItem(); 

  console.log({ isPending, isError, isSuccess, error });

  const submitForm = async (data) => {
    if(!currentUser || !currentUser.restaurant){
      console.error("No restaurant ID found for the current user.");
      return;
    }
    await mutateAsync({ restaurantId: currentUser.restaurant, data });
  }

  return (
        <MenuForm onSubmit={submitForm} isSubmitting={isPending} submitSuccess={isSuccess} submitError={isError} submitErrorData={error} />  
  )
}

export default AddFoodItem
