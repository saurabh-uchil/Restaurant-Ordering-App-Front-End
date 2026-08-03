import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MenuForm from "../components/MenuForm";
import axios from "axios";

const EditMenuItem = () => {
    const { id } = useParams();
     
    const [data, setData] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/menu/food-item/${id}`);
                const result = await response.json();
                console.log("Fetched Data:", result);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [id]);

  const handleSubmit = async (data) => {
    try{
      console.log("Submitting data:", data);
      setIsLoading(true);
      await axios.put(`http://localhost:3000/menu/update-food-item/${id}`, data);
      setUploadSuccess(true);
      setUploadError(false);
    } catch (error) {
      console.error("Error updating food item:", error);
      setUploadError(true);
      setUploadSuccess(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/menu/delete-food-item/${id}`);
      setUploadSuccess(true);
      setUploadError(false);
      //setData(null); // Clear the data after deletion
    } catch (error) {
      console.error("Error deleting food item:", error);
      setUploadError(true);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <>
    {data && <MenuForm key={id} onSubmit={handleSubmit} initialData={data} isLoading={isLoading} uploadSuccess={uploadSuccess} uploadError={uploadError} handleDelete={handleDelete} />}
   </>
        
  )
}
export default EditMenuItem
