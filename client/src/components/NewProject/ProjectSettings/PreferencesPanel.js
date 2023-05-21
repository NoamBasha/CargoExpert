import { OptionButton } from "./OptionButton";
import { ExplanationIcon } from "../../ExplanationIcon.js";

export const PreferencesPanel = ({
	preference,
	setPreference,
	options,
	text,
}) => {
	return (
		<div className="my-2">
			<div className="d-flex justify-content-between align-items-center">
				<label className="mb-1">{text}</label>
				<ExplanationIcon
					explanationHeader="Preference Panel"
					explanationText={`Choose your preferences:
						Order means that you prefer the boxes to fit the order you entered.
						Quantity means that you prefer to have as many boxes inside the container as possible.
						Time means that you prefer to wait as little as possible for a solution.
						Quality means that you prefer to wait as much as needed for an optimal solution.`}
				/>
			</div>
			<div className="mx-auto w-100 d-flex  justify-content-between">
				{options.map((option, i) => {
					return (
						<OptionButton
							key={i}
							className="mx-1"
							preference={preference}
							option={option}
							setOption={setPreference}
						/>
					);
				})}
			</div>
		</div>
	);
};
