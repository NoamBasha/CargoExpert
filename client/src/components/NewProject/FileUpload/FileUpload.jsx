import Papa from "papaparse";
import { Button } from "@mui/material";
import Dropzone from "./Dropzone.jsx";
import { DownloadFile } from "./DownloadFile";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "./FileUpload.css";

const CONTAINER_ERROR = "There is a problem with the container";
const BOXES_ERROR = "There is a problem with the boxes";
const FILE_ERROR = "There was an error pasring the file";
const FILE_UPLOAD_PAGE_TEXT = `You may upload a CSV file which contains the information about 
your container and boxes. You may find an example file here:`;

export const FileUpload = ({ setNewStage, setContainer, setBoxes }) => {
    const [fileName, setFileName] = useState(null);

    const handleDelete = useCallback(() => {
        setContainer(null);
        setBoxes([]);
        setFileName(null);
    }, [setContainer, setBoxes, setFileName]);

    useEffect(() => {
        handleDelete();
    }, [handleDelete]);

    const parseData = (data, fileName) => {
        try {
            let numericData = [];
            for (let i = 0; i < data.length; i++) {
                let numericObject = {};
                for (let property in data[i]) {
                    const value = data[i][property];
                    if (value && value.trim().length !== 0 && !isNaN(value)) {
                        numericObject[property] = parseFloat(value);
                    } else {
                        numericObject[property] = value.trim();
                    }
                }
                numericObject = {
                    id: i,
                    ...numericObject,
                    color: "",
                    isIn: false,
                };
                if (
                    Object.values(numericObject).includes(null) ||
                    Object.values(numericObject).includes(undefined)
                ) {
                    toast.error(BOXES_ERROR);
                    return;
                }
                numericData.push(numericObject);
            }

            let containerData = {
                width: numericData[0]["width"],
                height: numericData[0]["height"],
                length: numericData[0]["length"],
            };

            if (
                containerData.height === null ||
                containerData.width === null ||
                containerData.length === null
            ) {
                toast.error(CONTAINER_ERROR);
                return;
            }

            let boxes = [];
            for (let i = 1; i < numericData.length; i++) {
                boxes.push(numericData[i]);
            }
            setContainer(containerData);
            setBoxes(boxes);
            setFileName(fileName);
        } catch (err) {
            toast.error(FILE_ERROR);
        }
    };

    const handleDrop = (files) => {
        setFileName(null);
        try {
            Papa.parse(files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    parseData(results.data, files[0].name);
                },
            });
        } catch (e) {
            alert(FILE_ERROR);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center w-25">
            <p className="mb-0 text-center">{FILE_UPLOAD_PAGE_TEXT}</p>
            <DownloadFile />
            <Dropzone
                handleDrop={handleDrop}
                fileName={fileName}
                className="file-upload-dropzone px-4 py-5 text-secondary d-flex align-items-center justify-content-center w-100 rounded"
            />

            <div className="w-100 d-flex justify-content-between">
                <Button onClick={() => setNewStage(-1)}>Back</Button>
                <Button onClick={() => setNewStage(1)}>Continue</Button>
            </div>
        </div>
    );
};
