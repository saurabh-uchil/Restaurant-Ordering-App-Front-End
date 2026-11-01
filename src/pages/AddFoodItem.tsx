
import MenuForm from "../components/MenuForm";

import { useCurrentUser } from "../store/authStore";
import { useAddItem } from "../api/apihooks/useMenu";

const AddFoodItem = () => {

   const currentUser = useCurrentUser((state) => state.currentUser);

  const {mutateAsync, isPending, isError, isSuccess, error} = useAddItem(); 

  //console.log({ isPending, isError, isSuccess, error });

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
