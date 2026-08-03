import { dragAndDropStyles } from '../styles/DragAndDrop';
import Button from './Button';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { ImageUp, Trash2, Upload } from 'lucide-react';
import { IoCloudUpload } from 'react-icons/io5';

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

  {!previewImage ? (
    <div {...getRootProps()} className={dragAndDropStyles.selectImageContainer}>
      <div className={dragAndDropStyles.selectImageDiv}>
        <ImageUp className={dragAndDropStyles.selectImageIcon} />
      </div>

      <input {...getInputProps()} />

      <p className={dragAndDropStyles.dragActiveText}>{dragActiveText}</p>
      <p className={dragAndDropStyles.browseFilesText}>{browseFilesText}</p>
      <p className={dragAndDropStyles.fileSizeText}>{fileSizeText}</p>
    </div>
  ) : (
    <div className={dragAndDropStyles.imagePreview}>
  <img src={previewImage} alt="Menu item preview" className={dragAndDropStyles.previewImage} />

  <div className={dragAndDropStyles.previewActions}>
    {file && (
      <button type="button" className={dragAndDropStyles.uploadIconButton} onClick={handleUpload} aria-label="Upload image">
        <Upload size={15} />
      </button>
    )}

    <button type="button" className={dragAndDropStyles.deleteIconButton} onClick={handleClearImage} aria-label="Clear image">
      <Trash2 size={15} />
    </button>
  </div>
</div>
  )}
</div>
  )
}

export default DragAndDrop
