import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ className, handleDrop, fileName }) {
    const onDrop = useCallback((acceptedFiles) => {
        handleDrop(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [],
        },
    });

    return (
        <div
            {...getRootProps({
                className: className,
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>
                    {fileName
                        ? `${fileName} was uploaded successfully`
                        : `Drop a CSV file or click to upload your file!`}
                </p>
            )}
        </div>
    );
}

export default Dropzone;
