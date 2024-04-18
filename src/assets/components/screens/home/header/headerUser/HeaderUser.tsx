import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../../hooks/useAuth'
import styles from './headerUser.module.css'

const HeaderUser = () => {
	const { user, setUser } = useAuth()
	const [activeMenu, setActiveMenu] = useState(false)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (activeMenu && !(event.target as HTMLElement)?.closest(`.${styles.profile}`)) {
				setActiveMenu(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [activeMenu])

	return (
		<Link to='#' className={styles.profile}>
			<img
				src='src/img/user.jpg'
				alt='user-image'
				onClick={() => setActiveMenu(!activeMenu)}
			/>
			<div className={`${styles.menu} ${activeMenu ? styles._active : ''}`}>
				<p className={styles.profileName}>{user?.name}</p>
				<button
					className={styles.headerBtn}
					onClick={() => {
						setUser(null)
					}}
				>
					Logout
				</button>
			</div>
		</Link>
	)
}
export { HeaderUser }