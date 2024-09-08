import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './SortSelection.module.css'

const SortSelection = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState('Sort by...')
	const containerRef = useRef<HTMLDivElement>(null)

	const toogleOptions = () => {
		setIsOpen(!isOpen)
	}
	const selectOption = (option: string) => {
		setSelectedOptions(option)
		setIsOpen(false)
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
				<div className={styles.option} onClick={() => selectOption('By price')}>
					By price
				</div>
			</div>
		</div>
	)
}
export { SortSelection }
