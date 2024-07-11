import { FC, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { IOption, ISearchFormProps } from 'types/content.interface'
import styles from './SearchForm.module.css'
import { Switch } from './switcher/Switch'
const SearchForm: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const [selectedOptions, setSelectedOptions] = useState<MultiValue<IOption>>([])
	const options: IOption[] = data
		? Array.from(new Set(data.map(item => item.name))).map(name => ({
				value: name,
				label: name,
		  }))
		: []

	const handleChange = (selectedOptions: MultiValue<IOption>) => {
		setSelectedOptions(selectedOptions)
		if (selectedOptions && selectedOptions.length > 0) {
			const selectedValues = selectedOptions.map(option => option.value)
			onFilter(data.filter(item => selectedValues.includes(item.name)))
		} else {
			onFilter(data)
		}
	}

	return (
		<form className={`${styles.dFlex}`}>
			<Select isMulti onChange={handleChange} options={options} />
			<div className={styles.switchTheme}>
				<Switch />
			</div>
		</form>
	)
}
export { SearchForm }
