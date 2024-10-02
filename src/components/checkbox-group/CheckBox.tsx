import { Text } from '../text';
import { Option } from './Option';
import { OptionType } from 'src/constants/articleProps';

import styles from './CheckBox.module.scss';

type TCheckBoxProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
};

export const CheckBox = (props: TCheckBoxProps) => {
	const { title, options, selected, onChange, name } = props;

	const handleChange = (option: OptionType) => onChange?.(option);

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</>
			)}
			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.title}
						groupName={name}
						value={option.value}
						title={option.title}
						selected={selected}
						onChange={() => handleChange(option)}
						option={option}
					/>
				))}
			</div>
		</div>
	);
};
