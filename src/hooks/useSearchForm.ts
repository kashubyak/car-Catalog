import { useEffect, useMemo, useRef, useState } from 'react'
import { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISearchFormProps } from 'types/content.interface'

const useSearchForm = ({ onFilter, data }: ISearchFormProps) => {
	const [selectedOptions, setSelectedOptions] = useState<MultiValue<IOption>>([])
	const [isSearchActive, setIsSearchActive] = useState(false)
	const searchContainerRef = useRef<HTMLDivElement>(null)

	const options: IOption[] = useMemo(() => {
		return data
			? Array.from(new Set(data.map(item => item.name))).map(name => ({
					value: name,
					label: name,
			  }))
			: []
	}, [data])

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
	return {
		searchContainerRef,
		isSearchActive,
		animatedComponents,
		handleChange,
		options,
		toggleSearch,
	}
}
export { useSearchForm }
