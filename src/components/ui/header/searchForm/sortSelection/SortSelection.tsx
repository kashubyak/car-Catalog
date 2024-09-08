import { FC, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ISearchFormProps } from 'types/content.interface'
import styles from './SortSelection.module.css'

const SortSelection: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState('Sort by...')
	const containerRef = useRef<HTMLDivElement>(null)

	const sortData = (option: string) => {
		let newSortedData = [...data]
		if (option === 'By name') {
			newSortedData.sort((a, b) => a.name.localeCompare(b.name))
		} else if (option === 'Cheaper at first') {
			newSortedData.sort((a, b) => {
				return parseFloat(a.price) - parseFloat(b.price)
			})
		} else if (option === 'At first, more expensive') {
			newSortedData.sort((a, b) => {
				return parseFloat(b.price) - parseFloat(a.price)
			})
		}
		onFilter(newSortedData)
	}

	const toogleOptions = () => {
		setIsOpen(!isOpen)
	}
	const selectOption = (option: string) => {
		setSelectedOptions(option)
		setIsOpen(false)
		sortData(option)
	}
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

	return (
		<div className={styles.selectContainer} ref={containerRef}>
			<div className={styles.selectTrigger} onClick={toogleOptions}>
				<span>{selectedOptions}</span>
				<IoIosArrowDown />
			</div>
			<div className={`${styles.options} ${isOpen ? styles.active : ''}`}>
				<div className={styles.option} onClick={() => selectOption('By name')}>
					By name
				</div>
				<div className={styles.option} onClick={() => selectOption('Cheaper at first')}>
					Cheaper at first
				</div>
				<div
					className={styles.option}
					onClick={() => selectOption('At first, more expensive')}
				>
					At first, more expensive
				</div>
			</div>
		</div>
	)
}
export { SortSelection }
