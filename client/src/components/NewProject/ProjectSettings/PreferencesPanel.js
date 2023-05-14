import { OptionButton } from "./OptionButton";

export const PreferencesPanel = ({
	preference,
	setPreference,
	options,
	text,
}) => {
	return (
		<div className="my-2">
			<label className="mb-1">{text}</label>
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
