import { Stepper, Step, StepLabel } from "@material-ui/core";

export const Wizard = ({ stage }) => {
	const steps = [
		"Project Settings",
		"Upload File",
		"Edit Container",
		"Edit Boxes",
	];

	return (
		<div>
			<Stepper
				style={{
					fontFamily: "Arial, Helvetica, sans-serif",
					color: "#3a4750",
					backgroundColor: "#f3f3f3",
				}}
				activeStep={stage}
				alternativeLabel
			>
				{steps.map((step, i) => {
					return (
						<Step key={i}>
							<StepLabel>{step}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</div>
	);
};
