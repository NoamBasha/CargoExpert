import FileDownload from "js-file-download";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

export const DownloadFile = () => {
    const ENV = import.meta.env.VITE_REACT_ENV;
    let baseUrl;
    if (ENV === "development") {
        baseUrl = import.meta.env.VITE_REACT_DEV_URL;
    } else {
        baseUrl = import.meta.env.VITE_REACT_PROD_URL;
    }

    const DOWNLOAD_FILE_ERROR =
        "Can't download file at this time. Please try again later.";

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(baseUrl + "userInputExample");

            if (response.status === 200) {
                const resBlob = await response.blob();
                FileDownload(resBlob, "user_input_example_from_server.csv");
            } else {
                const data = await response.json();
                toast.error(data.error);
            }
        } catch (err) {
            toast.error(DOWNLOAD_FILE_ERROR);
        }
    };

    return (
        <div className="mt-0 mb-0">
            <Button
                style={{
                    fontSize: "0.75rem",
                }}
                onClick={handleClick}
            >
                Download example file
            </Button>
        </div>
    );
};
