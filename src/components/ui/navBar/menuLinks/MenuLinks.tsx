import { Switch } from 'components/ui/header/searchForm/switcher/Switch'
import { useFavorites } from 'hooks/useFavorites'
import { AuthContext } from 'providers/AuthProvides'
import { BurgerContext } from 'providers/BurgerProvides'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { ISideBarState } from 'types/content.interface'
import styles from './MenuLinks.module.css'

const MenuLinks: React.FC<ISideBarState> = ({ activeMenuItem }) => {
	const [activeItem, setActiveItem] = useState<string>(activeMenuItem)
	const handleItemClick = (item: string) => {
		setActiveItem(item)
	}
	const { open } = useContext(BurgerContext)
	const { setUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const { favorites } = useFavorites()

	return (
		<Transition in={open} timeout={0} unmountOnExit={true}>
			{state => (
				<div className={styles.containerLinks}>
					<div className={`${styles.menuLinks} ${state}`}>
						<ul>
							<Link to='/'>
								<li
									className={`navItem ${activeItem === 'home' ? styles.active : ''}`}
									onClick={() => handleItemClick('home')}
								>
									<i className='fa fa-home' aria-hidden='true'></i> <span>Home</span>
								</li>
							</Link>
							<Link to='/Favourite'>
								<li
									style={{ position: 'relative' }}
									className={`navItem ${activeItem === 'favourite' ? styles.active : ''}`}
									onClick={() => handleItemClick('favourite')}
								>
									<i className='fa fa-heart' aria-hidden='true'></i>
									<span>Favorite</span>
									<span className={styles.scoreFav}>{favorites.length}</span>
								</li>
							</Link>
							<Link to='/create-car'>
								<li
									className={`navItem ${activeItem === 'createCar' ? styles.active : ''}`}
									onClick={() => handleItemClick('createCar')}
								>
									<i className='fa fa-star' aria-hidden='true'></i>
									<span>Create Car</span>
								</li>
							</Link>
							<a>
								<li
									className={`navItem ${activeItem === 'logOut' ? styles.active : ''}`}
									onClick={() => {
										handleItemClick('logOut')
										setUser(null)
										navigate('/')
									}}
								>
									<i className='fa fa-sign-out' aria-hidden='true'></i>
									<span>Log Out</span>
								</li>
							</a>
						</ul>
						<div className={styles.switchTheme}>
							<Switch />
						</div>
					</div>
				</div>
			)}
		</Transition>
	)
}

export { MenuLinks }
