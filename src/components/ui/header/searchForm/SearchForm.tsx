import { FC, useEffect, useRef, useState } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISearchFormProps } from 'types/content.interface'
import './SearchForm.css'
import { SortSelection } from './sortSelection/SortSelection'
import { Switch } from './switcher/Switch'

const SearchForm: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const [selectedOptions, setSelectedOptions] = useState<MultiValue<IOption>>([])
	const [isSearchActive, setIsSearchActive] = useState(false)
	const searchContainerRef = useRef<HTMLDivElement>(null)

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

	const toggleSearch = () => {
		setIsSearchActive(prevState => !prevState)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			searchContainerRef.current &&
			!searchContainerRef.current.contains(event.target as Node) &&
			!(event.target as HTMLElement).closest('.searchIcon')
		) {
			setIsSearchActive(false)
		}
	}

	const handleResize = () => {
		if (window.innerWidth > 600) {
			setIsSearchActive(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		window.addEventListener('resize', handleResize)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<form className='dFlex'>
			<div
				ref={searchContainerRef}
				className={`searchContainer ${isSearchActive ? 'active' : ''}`}
			>
				<Select
					maxMenuHeight={200}
					components={animatedComponents}
					classNamePrefix='custom-styles'
					onChange={handleChange}
					options={options}
					placeholder='Find cars'
					isMulti
					styles={{
						container: provided => ({
							...provided,
							width: '100%',
						}),
						control: provided => ({
							...provided,
							width: '100%',
						}),
					}}
				/>
				<SortSelection />
			</div>
			<i className='fa fa-search searchIcon' aria-hidden='true' onClick={toggleSearch} />
			<div className='switchTheme'>
				<Switch />
			</div>
		</form>
	)
}

export { SearchForm }
