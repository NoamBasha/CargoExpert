import { OptionButton } from "./OptionButton";

export const PreferencesPanel = ({
	preference,
	setPreference,
	options,
	text,
}) => {
	return (
		<div>
			<label className="darkBrown mb-2">{text}</label>
			<div className="mx-auto w-50 d-flex m-1 justify-content-around">
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
