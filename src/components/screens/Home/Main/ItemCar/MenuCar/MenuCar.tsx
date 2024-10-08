import { useActions } from 'hooks/useActions'
import { useDeleteCar } from 'hooks/useDeleteCar'
import { useFavorites } from 'hooks/useFavorites'
import { FC, useEffect, useRef, useState } from 'react'
import { ICar } from 'types/car.interface'
import styles from './MenuCar.module.css'

interface IMenuCarProps {
	active: boolean
	car: ICar
}

const MenuCar: FC<IMenuCarProps> = ({ active, car }) => {
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
		return () => document.removeEventListener('click', handleClickOutside)
	}, [menuActive])

	const { favorites } = useFavorites()
	const { toggleFavorites } = useActions()
	const isExist = favorites.some((c: ICar) => c.id === car.id)
	const { addNotification } = useActions()

	const handleToggleFavorite = () => {
		toggleFavorites(car)
		addNotification({
			message: isExist ? 'Removed from favorites!' : 'Added to favorites!',
			backgroundColor: isExist ? 'var(--col-popup-re)' : 'var(--col-popup-gr)',
		})
	}
	const { deleteCar } = useDeleteCar()
	const handleDelete = () => {
		if (confirm('You are confident in your actions?')) {
			deleteCar(car.id)
			addNotification({
				message: 'Your car is delete!',
				backgroundColor: 'var(--col-popup-re)',
			})
		}
	}
	return (
		<div ref={menuRef} className={`${styles.menu} ${menuActive ? styles.active : ''}`}>
			<div className={styles.activeMenu}>
				<ul>
					<li onClick={() => handleToggleFavorite()}>
						<i className={`fa fa-heart${isExist ? '' : '-o'}`} aria-hidden='true' />
						<p className={styles.favorites}>
							{isExist ? 'Remove favorite' : 'Add favorite'}
						</p>
					</li>
					<li onClick={() => handleDelete()}>
						<i className='fa fa-trash-o' aria-hidden='true' />
						<p className={styles.delete}>Delete</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export { MenuCar }
