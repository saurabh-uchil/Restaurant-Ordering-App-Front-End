import { dragAndDropStyles } from '../styles/DragAndDrop';
import Button from './Button';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { ImageUp } from 'lucide-react';

const DragAndDrop = ({label, subLabel, icon: Icon, browseFilesText, fileSizeText, upload, setValue, name, file, setFile, getRootProps, getInputProps, isDragActive, initialValue}) => {
    
    const [currentImage, setCurrentImage] = useState(initialValue);

    const handleUpload = () => {
        upload();
    }
    
    const handleClearImage = () => {
        setFile(null);
        setCurrentImage(null);
        setValue(name, null);
    }

    const dragActiveText = isDragActive ? "Drop the image here..." : "Drag & drop an image";

    const previewImage = file?.preview || currentImage;

    //clean up
    useEffect(() => {
            return () => {
            if (file) URL.revokeObjectURL(file.preview);
            };
        }, [file]);

  return (
    <div>
        <div className={dragAndDropStyles.dragDropContainer}>
            <div className={dragAndDropStyles.imageHeader}>
                <div className={dragAndDropStyles.sectionIcon}>
                    <Icon size={14} />
                </div>

                <div>
                    <p className={dragAndDropStyles.sectionTitle}>{label}</p>
                    <p className={dragAndDropStyles.imageSubLabel}>{subLabel}</p>
                </div>
            </div>
            
            <div {...getRootProps()} className={dragAndDropStyles.selectImageContainer}>
                
                <div  className={dragAndDropStyles.selectImageDiv}>
                    {/* <IoCloudUpload  className={dragAndDropStyles.selectImageIcon}/> */}
                    <ImageUp size={20} className={dragAndDropStyles.selectImageIcon}/>
                </div>
                
                <input {...getInputProps()} />

                <p className={dragAndDropStyles.dragActiveText}>{dragActiveText}</p>

                <p className={dragAndDropStyles.browseFilesText}>{browseFilesText}</p>
                <p className={dragAndDropStyles.fileSizeText}>{fileSizeText}</p>
            </div> 
            

            {previewImage && (
            <div className={dragAndDropStyles.filePreviewContainer}>
                <img
                src={previewImage}
                alt="preview"
                className={dragAndDropStyles.filePreviewImage}
                />
            
                <div className={dragAndDropStyles.uploadButtonContainer}>
                    <Button icon={<IoCloudUpload />} text="Upload Image" variant="transparentGreen" onClick={handleUpload}/>
                    <Button icon={<RiDeleteBin4Fill />} text="Clear Image" variant="transparentRed" onClick={handleClearImage}/>  
                </div>  
            
            </div>
            )}

        </div>
    </div>
  )
}

export default DragAndDrop
