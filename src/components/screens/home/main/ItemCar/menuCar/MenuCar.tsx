import { FC, useEffect, useRef, useState } from 'react'
import styles from './menuCar.module.css'
const MenuCar: FC<{ active: boolean }> = ({ active }) => {
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
	return (
		<div ref={menuRef} className={`${styles.menu} ${menuActive ? styles.active : ''}`}>
			<div className={styles.activeMenu}>
				<ul>
					<li>
						<i className='fa fa-heart-o' aria-hidden='true'></i>
						<p className={styles.favorites}>Add to favorites</p>
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
