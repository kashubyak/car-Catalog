import { FC, useState } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISearchFormProps } from 'types/content.interface'
import './SearchForm.css'
import { Switch } from './switcher/Switch'

const SearchForm: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const [selectedOptions, setSelectedOptions] = useState<MultiValue<IOption>>([])
	const options: IOption[] = data
		? Array.from(new Set(data.map(item => item.name))).map(name => ({
				value: name,
				label: name,
		  }))
		: []

	const animatedComponents = makeAnimated()
	const handleChange = (
		newValue: MultiValue<IOption>,
		actionMeta: ActionMeta<IOption>,
	) => {
		setSelectedOptions(newValue)
		if (newValue && newValue.length > 0) {
			const selectedValues = newValue.map(option => option.value)
			onFilter(data.filter(item => selectedValues.includes(item.name)))
		} else {
			onFilter(data)
		}
	}

	return (
		<form className='dFlex'>
			<Select
				components={animatedComponents}
				classNamePrefix='custom-styles'
				onChange={handleChange}
				options={options}
				placeholder='Find cars'
				isMulti
			/>
			<div className='switchTheme'>
				<Switch />
			</div>
		</form>
	)
}

export { SearchForm }
