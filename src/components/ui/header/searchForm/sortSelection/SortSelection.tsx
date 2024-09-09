import { useSortSelection } from 'hooks/useSortSelection'
import { FC } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ISearchFormProps } from 'types/content.interface'
import styles from './SortSelection.module.css'

const SortSelection: FC<ISearchFormProps> = ({ onFilter, data }) => {
	const { selectedOptions, containerRef, toogleOptions, selectOption, isOpen } =
		useSortSelection({ onFilter, data })

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
				<div className={styles.option} onClick={() => selectOption('Expensive at first')}>
					Expensive at first
				</div>
			</div>
		</div>
	)
}
export { SortSelection }
