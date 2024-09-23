import { useCallback, useEffect, useRef, useState } from 'react'
import { ISearchFormProps } from 'types/content.interface'

const useSortSelection = ({ onFilter, data }: ISearchFormProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState('Sort by...')
	const containerRef = useRef<HTMLDivElement>(null)

	const sortData = useCallback(
		(option: string) => {
			let newSortedData = [...data]
			if (option === 'By name') {
				newSortedData.sort((a, b) => a.name.localeCompare(b.name))
			} else if (option === 'Cheaper at first') {
				newSortedData.sort((a, b) => {
					return parseFloat(a.price) - parseFloat(b.price)
				})
			} else if (option === 'Expensive at first') {
				newSortedData.sort((a, b) => {
					return parseFloat(b.price) - parseFloat(a.price)
				})
			}
			onFilter(newSortedData)
		},
		[data, onFilter],
	)
	const toggleOptions = useCallback(() => {
		setIsOpen(prev => !prev)
	}, [])

	const selectOption = useCallback(
		(option: string) => {
			setSelectedOptions(option)
			setIsOpen(false)
			sortData(option)
		},
		[sortData],
	)
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	return {
		selectedOptions,
		containerRef,
		toggleOptions,
		selectOption,
		isOpen,
	}
}
export { useSortSelection }
