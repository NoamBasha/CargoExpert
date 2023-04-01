import "./NewProject.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";

export const Wizard = ({ stage }) => {
	return (
		<div>
			<Stepper
				activeStep={stage}
				alternativeLabel
			>
				<Step>
					<StepLabel>Upload File</StepLabel>
				</Step>
				<Step>
					<StepLabel>Edit Container</StepLabel>
				</Step>
				<Step>
					<StepLabel>Edit Boxes</StepLabel>
				</Step>
			</Stepper>
		</div>
	);
};
