import { Button, TextField } from "@mui/material";
import { PreferencesPanel } from "./PreferencesPanel.jsx";
import { ExplanationIcon } from "../../ExplanationIcon.jsx";
import { toast } from "react-toastify";

export const ProjectSettings = ({
    name,
    setName,
    setNewStage,
    orderQuantity,
    setOrderQuantity,
    timeQuality,
    setTimeQuality,
}) => {
    const validateName = () => {
        if (name.trim().length === 0) {
            return false;
        }
        return true;
    };

    return (
        <form style={{ width: "20%" }} className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
                <label className="">Project's Name:</label>
                <ExplanationIcon
                    explanationHeader="Project's Name"
                    explanationText="Enter a name for your new project!"
                    type="popover"
                />
            </div>
            <TextField
                className="mb-1"
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                placeholder="Project"
            />

            <PreferencesPanel
                preference={orderQuantity}
                setPreference={setOrderQuantity}
                options={["Quantity", "Order"]}
                text={"Order vs Quantity:"}
            />

            <PreferencesPanel
                preference={timeQuality}
                setPreference={setTimeQuality}
                options={["Time", "Quality"]}
                text={"Time vs Quality:"}
            />

            <Button
                className="w-25 mx-auto mt-2"
                onClick={() => {
                    if (validateName()) {
                        setNewStage(1);
                    } else {
                        toast.error("Problem with name");
                    }
                }}
            >
                Continue
            </Button>
        </form>
    );
};
