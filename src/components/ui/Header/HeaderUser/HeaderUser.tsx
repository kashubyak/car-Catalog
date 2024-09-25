import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HeaderUser.module.css'
import UserImg from '/public/img/user.jpg'

const HeaderUser = () => {
	const { setUser } = useActions()
	const user = useTypedSelector(state => state.user.user)
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
		<div className={styles.profile}>
			<img src={UserImg} alt='user-image' onClick={() => setActiveMenu(!activeMenu)} />
			<div className={`${styles.menu} ${activeMenu ? styles.active : ''}`}>
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
		</div>
	)
}
export { HeaderUser }
