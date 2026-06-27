import { IoCloudUpload } from 'react-icons/io5';
import { dragAndDropStyles } from '../styles/DragAndDrop';
import Label from './Label';
import Button from './Button';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { useEffect } from 'react';

const DragAndDrop = ({label, subLabel, browseFilesText, fileSizeText, upload, setValue, name, file, setFile, getRootProps, getInputProps, isDragActive}) => {
    
    const handleUpload = () => {
        upload();
    }
    
    const handleClearImage = () => {
        setFile(null);
        setValue(name, null);
    }
    const dragActiveText = isDragActive ? "Drop the image here..." : "Drag & drop an image";

    //clean up
    useEffect(() => {
            return () => {
            if (file) URL.revokeObjectURL(file.preview);
            };
        }, [file]);

  return (
    <div>
        <div className={dragAndDropStyles.dragDropContainer}>
            <div>
                <Label label={label} />
                <Label label={subLabel} />
            </div>
            
            <div {...getRootProps()} className={dragAndDropStyles.selectImageContainer}>
                
                <div  className={dragAndDropStyles.selectImageDiv}>
                    <IoCloudUpload  className={dragAndDropStyles.selectImageIcon}/>
                </div>
                
                <input {...getInputProps()} />

                <p>{dragActiveText}</p>

                <p className={dragAndDropStyles.browseFilesText}>{browseFilesText}</p>
                <p className={dragAndDropStyles.fileSizeText}>{fileSizeText}</p>
            </div> 
            

            {file && (
            <div className={dragAndDropStyles.filePreviewContainer}>
                <img
                src={file.preview}
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
