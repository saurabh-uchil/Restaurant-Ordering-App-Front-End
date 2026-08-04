/* eslint-disable react-hooks/set-state-in-effect */
import { dragAndDropStyles } from '../styles/DragAndDrop';
import { useEffect, useState } from 'react';
import { CheckCircle2, CircleAlert, ImageUp, LoaderCircle, Trash2, Upload } from 'lucide-react';

const DragAndDrop = ({label, subLabel, icon: Icon, browseFilesText, fileSizeText, upload, setValue, name, file, setFile, getRootProps, getInputProps, isDragActive, initialValue, isUploading, isUploadSuccess, progress, uploadError, resetImage}) => {
    
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


    useEffect(() => {
        if (!resetImage) return;

        setCurrentImage(null);
      }, [resetImage]);

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

  {previewImage ? (
  <>
    <div className={dragAndDropStyles.imagePreview}>
      <img src={previewImage} alt="Menu item preview" className={dragAndDropStyles.previewImage} />

      {isUploading && (
        <div className={dragAndDropStyles.uploadOverlay}>
          <LoaderCircle size={22} className="animate-spin text-white" />

          <span className={dragAndDropStyles.progressPercentage}>
            {Math.round(progress)}%
          </span>

          <p className={dragAndDropStyles.uploadingText}>
            Uploading...
          </p>
        </div>
      )}

      {!isUploading && (
        <div className={dragAndDropStyles.previewActions}>
          {file && !isUploadSuccess && (
            <button type="button" className={dragAndDropStyles.uploadIconButton} onClick={handleUpload} aria-label="Upload image">
              <Upload size={15} />
            </button>
          )}

          <button type="button" className={dragAndDropStyles.deleteIconButton} onClick={handleClearImage} aria-label="Clear image">
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>

    {isUploadSuccess && (
      <div className={dragAndDropStyles.uploadSuccess}>
        <CheckCircle2 size={14} />
        <span>Image uploaded successfully</span>
      </div>
    )}

    {uploadError && (
      <div className={dragAndDropStyles.uploadError}>
        <CircleAlert size={14} />
        <span>Unable to upload image. Please try again.</span>
      </div>
    )}
  </>
) : (
  <div {...getRootProps()} className={dragAndDropStyles.selectImageContainer}>
    <div className={dragAndDropStyles.selectImageDiv}>
      <ImageUp className={dragAndDropStyles.selectImageIcon} />
    </div>

    <input {...getInputProps()} />

    <p className={dragAndDropStyles.dragActiveText}>{dragActiveText}</p>
    <p className={dragAndDropStyles.browseFilesText}>{browseFilesText}</p>
    <p className={dragAndDropStyles.fileSizeText}>{fileSizeText}</p>
  </div>
)}
</div>
  )
}

export default DragAndDrop
