import axios from "axios";

const getPresignedUrl = async (file: File) => {
    const response = await axios.post("http://localhost:3000/image-uploader/presigned-url", {
            fileName: file.name,
            fileType: file.type
    });
    return response;
};

export const handleImageUpload = async (file: File, setValue: any, setProgress: any, setUploadError: any) => {
        try{
            console.log(file);
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        
        const response = await getPresignedUrl(file);
        console.log(response.data);
        const{presignedUrl, imageUrl} = response.data;
        
        console.log(presignedUrl, imageUrl);

        await axios.put(presignedUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
            onUploadProgress: (progressEvent) => {                
                const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                setProgress(progress);
                // console.log(`Upload Progress: ${progress}%`);
            }
        });
        console.log("imageUrl:", imageUrl);
        setValue("imageUrl", imageUrl);
        alert("Image uploaded successfully!");
        }catch(error){
            console.error("Error uploading image:", error);
            setUploadError(true);
        }
    }

