import { useState } from 'react'

const useGetExistingDataHook = () => {
 const [existingData, setExistingData] = useState([]);
 
 const clearExistingData = () => {
   setExistingData([]);
 }

 return { existingData, setExistingData, clearExistingData };
}

export default useGetExistingDataHook;
