import { Line } from "rc-progress";
import useImageUploaderHook from "../hooks/useImageUploaderHook";
import useUploaderHook from "../hooks/useUploaderHook";
import { handleImageUpload } from "../services/imageUploaderService";
import { addToMenuStyles } from "../styles/addToMenu";
import DragAndDrop from "./DragAndDrop";

const UploadImage = ({name, setValue}) => {

    const {progress, uploadError, setProgress, setUploadError} = useUploaderHook();
    const { file, setFile, getRootProps, getInputProps, isDragActive } = useImageUploaderHook();

    const handleUpload = () => {
        if (!file) return;
        handleImageUpload(file, setValue, setProgress, setUploadError);
    }

    const progressBar = progress > 0 && progress < 100 ? <Line percent={progress} strokeWidth={2} strokeColor={addToMenuStyles.progressBarColor} /> : null;
    const errorMessage = uploadError ? <p className={addToMenuStyles.errorMessage}>Upload failed!</p> : null;
    const uploadSuccess = progress === 100 ? <p className={addToMenuStyles.successfulUploadMessage}>Upload complete!</p> : null;
    
    return (
        <div className={addToMenuStyles.imageUploadContainer}>
                   
            <DragAndDrop 
                upload={handleUpload} 
                setValue={setValue} 
                name={name} 
                label="Item Image *" 
                subLabel="Upload an Image that showcases your dish" 
                browseFilesText="or click to browse files"  
                fileSizeText="PNG or JPG upto 5MB"
                file={file}
                setFile={setFile}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
            />
            {progressBar}
            {errorMessage}
            {uploadSuccess}
            
        </div>
    )
}

export default UploadImage
