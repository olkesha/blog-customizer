import { OptionType } from 'src/constants/articleProps';

import styles from './CheckBox.module.scss';
import { Text } from '../text';
import clsx from 'clsx';
import { useRef } from 'react';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;
	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => onChange?.(option);

	return (
		<div className={styles.item} key={value} ref={optionRef}>
			<label className={styles.label}>
				<input
					className={clsx(styles.input, styles.visuallyHidden)}
					checked={value === selected.title}
					type='checkbox'
					name={groupName}
					value={value}
					onChange={handleChange}
				/>
				<span className={styles.pseudoCheckbox}></span>
				<span className={styles.text}>
					{
						<Text as='span' size={18} uppercase>
							{title}
						</Text>
					}
				</span>
			</label>
		</div>
	);
};
