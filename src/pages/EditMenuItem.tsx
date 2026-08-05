import { useNavigate, useParams } from "react-router";
import MenuForm from "../components/MenuForm";
import { useCurrentUser } from "../store/authStore";
import { useGetItemById, useEditFoodItem, useDeleteFoodItem } from "../api/apihooks/useMenu";
import { ContentState } from "../components/ContentState";
import { menuItemContentStates } from "../data/validationMessages";

const EditMenuItem = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const currentUser = useCurrentUser(state => state.currentUser);
     
    const {data, isPending: isFetching, isError: isFetchError, error: fetchError} = useGetItemById(id);

    const { mutateAsync, isPending: isEditing, isSuccess:editSuccess, isError: isEditError, error: editError } = useEditFoodItem();

    const { mutateAsync: deleteItem, isPending: isDeleting, isError: isDeleteError, error: deleteError } = useDeleteFoodItem();

    const handleSubmit = async (data) => {
      if (!id || !currentUser?.restaurant) return;
      await mutateAsync({id, item: {...data, restaurant_Id: currentUser.restaurant}});
    };

    const handleDelete = async () => {
      if(!id) return;
      await deleteItem(id);
      
      navigate("/dashboard/menu",{
        state: {
            notification: {
            variant: "success",
            message: `${data?.name || "Item"} deleted successfully`,
          },
        },
      });
      
    };

    if(isFetching){
      return <ContentState type={menuItemContentStates.loading.type} title={menuItemContentStates.loading.title} />
    }

    if(isFetchError){
      return <ContentState type={menuItemContentStates.error.type} title={menuItemContentStates.error.title} description={fetchError?.message || menuItemContentStates.error.description} />
    }

    if(!data){
      return <ContentState type={menuItemContentStates.empty.type} title={menuItemContentStates.empty.title} description={menuItemContentStates.empty.description} />
    }

  return (
    <>
      <MenuForm
        onSubmit={handleSubmit}
        initialData={data}
        isSubmitting={isEditing}
        submitSuccess={editSuccess}
        submitError={isEditError}
        submitErrorData={editError}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
        deleteError={isDeleteError}
        deleteErrorData={deleteError}
      />
    </>  
  )
}
export default EditMenuItem
