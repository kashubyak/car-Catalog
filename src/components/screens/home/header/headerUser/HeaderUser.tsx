import { AuthContext } from 'providers/AuthProvides'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './headerUser.module.css'

const HeaderUser = () => {
	const { user, setUser } = useContext(AuthContext)
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
				src='/public/img/user.jpg'
				alt='user-image'
				onClick={() => setActiveMenu(!activeMenu)}
			/>
			<div className={`${styles.menu} ${activeMenu ? styles._active : ''}`}>
				<p className={styles.profileName}>{user?.name}</p>
				<Link
					className={`btn ${styles.btnUser}`}
					onClick={() => {
						setUser(null)
					}}
					to={''}
				>
					Log Out
				</Link>
			</div>
		</Link>
	)
}
export { HeaderUser }
