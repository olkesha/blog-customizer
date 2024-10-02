import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	contentWidthArr,
	backgroundColors,
	fontColors,
	ArticleStateType,
	checkBoxOptions,
} from '../../constants/articleProps';
import { useCloseSidebarByOverlay } from './hooks/useCloseSidebarByOverlay';

import styles from './ArticleParamsForm.module.scss';
import { CheckBox } from '../checkbox-group/CheckBox';

type ArticleParamsFormProps = {
	onSubmit: (data: ArticleStateType) => void;
	onReset: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [pageState, setPageState] = useState(defaultArticleState);
	const ref = useRef<HTMLDivElement>(null);

	// состояния элементов формы
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);
	const [checkboxState, setCheckboxState] = useState(checkBoxOptions[1]);

	useCloseSidebarByOverlay({
		isOpen: isSidebarOpen,
		rootRef: ref,
		onClose: () => setIsSidebarOpen(false),
	});

	const handleOpenNCloseForm = () => {
		{
			isSidebarOpen === false
				? setIsSidebarOpen(true)
				: setIsSidebarOpen(false);
		}
	};

	const handleSubmitForm = (event: FormEvent) => {
		event.preventDefault();
		props.onSubmit(pageState);
	};

	const handleResetForm = (event: FormEvent) => {
		event.preventDefault();
		props.onReset(defaultArticleState);

		// устаналиваем состояние формы в нач. значения
		setPageState(defaultArticleState);

		// сброс состояний
		setFontFamily(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setContentWidth(contentWidthArr[0]);
	};

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleOpenNCloseForm} />
			<aside
				className={
					isSidebarOpen
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<CheckBox
						title='Название чекбокса'
						name='checkbox'
						options={checkBoxOptions}
						selected={checkboxState}
						onChange={(selected) => {
							setCheckboxState(selected);
						}}
					/>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={(selected) => {
							setFontFamily(selected),
								setPageState({ ...pageState, fontFamilyOption: selected });
						}}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(selected) => {
							setFontSize(selected),
								setPageState({ ...pageState, fontSizeOption: selected });
						}}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={(selected) => {
							setFontColor(selected),
								setPageState({ ...pageState, fontColor: selected });
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={(selected) => {
							setBackgroundColor(selected),
								setPageState({ ...pageState, backgroundColor: selected });
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={(selected) => {
							setContentWidth(selected),
								setPageState({ ...pageState, contentWidth: selected });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
