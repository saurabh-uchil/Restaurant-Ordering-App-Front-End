import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { IoCloudUpload } from "react-icons/io5";
import Button from "./Button";
import Label from "./Label";

export default function DragDrop() {
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

        <p className="text-emerald-600 font-medium">Click to browse files</p>
        <p className="text-gray-600">PNG or JPG upto 5MB</p>
      </div> 

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <img
          src={file.preview}
          alt="preview"
          className="object-cover mt-2 rounded-md border border-slate-600"
          />
        <div className="flex gap-4 mt-4">
          <Button text="Upload Image" variant="primary"/>
          <Button text="Clear Image" variant="danger"/>  
        </div>  
        
        </div>
      )}
    </div>
  );
}