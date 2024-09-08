import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './SortSelection.module.css'

const SortSelection = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState('Sort by...')
	const toogleOptions = () => {
		setIsOpen(!isOpen)
	}
	const selectOption = (option: string) => {
		setSelectedOptions(option)
		setIsOpen(false)
	}
	return (
		<div className={styles.selectContainer}>
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
