import { useEffect } from "react";
import useImageUploaderHook from "../hooks/useImageUploaderHook";
import useUploaderHook from "../hooks/useUploaderHook";
import { handleImageUpload } from "../services/imageUploaderService";
import { addToMenuStyles } from "../styles/addToMenu";
import DragAndDrop from "./DragAndDrop";
import { ImageIcon } from "lucide-react";

type UploadImageProps = {
    name: string,
    setValue?: any,
    initialValue?: any,
    resetImage?: boolean,
    onResetComplete?: () => void,
}

const UploadImage = ({name, setValue, initialValue, resetImage, onResetComplete}:UploadImageProps) => {

    const {progress, uploadError, setProgress, setUploadError} = useUploaderHook();
    const { file, setFile, getRootProps, getInputProps, isDragActive } = useImageUploaderHook();

    useEffect(() => {
        if (!resetImage) return;

        setFile(null);
        setProgress(0);
        setUploadError(false);

        onResetComplete?.();
    }, [resetImage]);

    

    const handleUpload = () => {
        if (!file) return;
        handleImageUpload(file, setValue, setProgress, setUploadError);
    }

    const isUploading = progress > 0 && progress < 100;
    const isUploadSuccess = progress === 100;

    return (
        <div className={addToMenuStyles.imageUploadContainer}>
                   
            <DragAndDrop 
                upload={handleUpload} 
                setValue={setValue} 
                name={name} 
                label="Item Image *" 
                icon={ImageIcon}
                subLabel="Upload an Image that showcases your dish" 
                browseFilesText="or click to browse files"  
                fileSizeText="PNG or JPG upto 5MB"
                file={file}
                initialValue={initialValue}
                setFile={setFile}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                isUploading={isUploading}
                isUploadSuccess={isUploadSuccess}
                progress={progress}
                uploadError={uploadError}
                resetImage={resetImage}
            />
            
        </div>
    )
}

export default UploadImage
