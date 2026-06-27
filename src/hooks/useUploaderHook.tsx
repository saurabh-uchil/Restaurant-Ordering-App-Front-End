import { useState } from 'react'

const useUploaderHook = () => {

    const [progress, setProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    
    const handleImageUpload = async (file: File) => {
        try{
            alert('Uploading image...');
        }catch(error){
                setUploadError(true);
        }
    }

  return {progress, uploadSuccess, uploadError, setProgress, setUploadSuccess, setUploadError, handleImageUpload}
}

export default useUploaderHook;
