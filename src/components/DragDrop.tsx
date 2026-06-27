import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { IoCloudUpload } from "react-icons/io5";
import Button from "./Button";
import Label from "./Label";
import { RiDeleteBin4Fill } from "react-icons/ri";
import type { FieldValues, UseFormSetValue } from "react-hook-form";

type DragDropProTypes = {
    upload: (file: File) => Promise<void>,
    name: string,
    setValue: UseFormSetValue<FieldValues>
}
export default function DragDrop({upload, name, setValue}: DragDropProTypes) {
  const [file, setFile] = useState<File & { preview: string } | null>(null);

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const selected = acceptedFiles[0];

      if (selected) {
        setFile(
          Object.assign(selected, {
            preview: URL.createObjectURL(selected),
          })
        );
      }
    },
  });

  // cleanup
  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleUpload = async() => {
    // Implement your upload logic here, e.g., using fetch or axios to send the file to a server

    if (!file) return;

    upload(file)
      .then(() => {
        alert("Image uploaded successfully!");
        //setFile(null); // Clear the selected file after upload
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      });
  }

  const handleClearImage = () => {
    setFile(null);
    setValue(name, null);
  }


  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div>
        <Label label="Item Image *" />
        <Label label="Upload an Image that showcases your dish"/>
      </div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-500 rounded p-10 text-center cursor-pointer">
        
        <div  className="flex items-center justify-center mb-4">
          <IoCloudUpload  className="text-emerald-600 w-12 h-12"/>
        </div>
        
        <input {...getInputProps()} />

        {isDragActive ? (
          <p >Drop the image here...</p>
        ) : (
          <p >Drag & drop an image</p>
        )}

        <p className="text-emerald-600 font-medium">or click to browse files</p>
        <p className="text-gray-600 text-sm">PNG or JPG upto 5MB</p>
      </div> 

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <img
          src={file.preview}
          alt="preview"
          className="object-cover mt-2 rounded-md border border-slate-600"
          />
           
        <div className="flex gap-4 mt-4">
          <Button icon={<IoCloudUpload />} text="Upload Image" variant="transparentGreen" onClick={handleUpload}/>
          <Button icon={<RiDeleteBin4Fill />} text="Clear Image" variant="transparentRed" onClick={handleClearImage}/>  
        </div>  
        
        </div>
      )}
    </div>
  );
}