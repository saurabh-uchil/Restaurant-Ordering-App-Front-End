import DragDrop from "./DragDrop";
import { addToMenuStyles } from "../styles/addToMenu";
import { Line } from "rc-progress";
import useUploaderHook from "../hooks/useUploaderHook";
import DragAndDrop from "./DragAndDrop";

const ImageUploader = ({name, setValue}) => {

    const {progress, uploadSuccess, uploadError, setProgress, setUploadSuccess, setUploadError, handleImageUpload} = useUploaderHook();

  return (
    <div className={addToMenuStyles.imageUploadContainer}>
                <DragDrop upload={handleImageUpload} setValue={setValue} name={name}/>
                {progress > 0 && progress < 100 && <Line percent={progress} strokeWidth={2} strokeColor={addToMenuStyles.progressBarColor} /> }
                {uploadError && <p className="text-red-600 bg-red-200 p-2 rounded text-center text-sm">Upload failed!</p>}
                {progress === 100 &&  <p className={addToMenuStyles.successfulUploadMessage}>Upload complete!</p>} 
                {/* <DragAndDrop label="Item Image *" subLabel="Upload an Image that showcases your dish" browseFilesText="or click to browse files"  fileSizeText="PNG or JPG upto 5MB"/> */}
    </div>
  )
}

export default ImageUploader
