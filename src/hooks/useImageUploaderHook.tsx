import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useImageUploaderHook = () => {
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

    return { file, setFile, getRootProps, getInputProps, isDragActive };
}

export default useImageUploaderHook
