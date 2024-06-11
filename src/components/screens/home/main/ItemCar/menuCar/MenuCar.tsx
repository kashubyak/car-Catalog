import { useActions } from 'hooks/useActions'
import { useFavorites } from 'hooks/useFavorites'
import { FC, useEffect, useRef, useState } from 'react'
import { ICar } from 'types/car.interface'
import styles from './MenuCar.module.css'

const MenuCar: FC<{ active: boolean; car: ICar }> = ({ active, car }) => {
	const [menuActive, setMenuActive] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setMenuActive(active)
	}, [active])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuActive(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [menuActive])

	const { favorites } = useFavorites()
	const { toggleFavorites } = useActions()
	const isExist = favorites.some((c: ICar) => c.id === car.id)

	return (
		<div ref={menuRef} className={`${styles.menu} ${menuActive ? styles.active : ''}`}>
			<div className={styles.activeMenu}>
				<ul>
					<li onClick={() => toggleFavorites(car)}>
						<i className={`fa fa-heart${isExist ? '' : '-o'}`} aria-hidden='true'></i>
						<p className={styles.favorites}>
							{isExist ? 'Remove favorite' : 'Add favorite'}
						</p>
					</li>
					<li>
						<i className='fa fa-trash-o' aria-hidden='true'></i>
						<p className={styles.delete}>Delete</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export { MenuCar }