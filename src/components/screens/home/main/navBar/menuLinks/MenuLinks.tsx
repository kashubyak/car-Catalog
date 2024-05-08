import { Switch } from 'components/screens/home/header/searchForm/switcher/Switch'
import { AuthContext } from 'providers/AuthProvides'
import { BurgerContext } from 'providers/BurgerProvides'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { ISideBarState } from 'types/content.interface'
import styles from './menuLinks.module.css'

const MenuLinks: React.FC<ISideBarState> = ({ activeMenuItem }) => {
	const [activeItem, setActiveItem] = useState<string>(activeMenuItem)
	const handleItemClick = (item: string) => {
		setActiveItem(item)
	}
	const { open } = useContext(BurgerContext)
	const { setUser } = useContext(AuthContext)

	return (
		<Transition in={open} timeout={0} unmountOnExit={true}>
			{state => (
				<div className={styles.containerLinks}>
					<div className={`${styles.menuLinks} ${state}`}>
						<ul>
							<li
								className={`navItem ${activeItem === 'home' ? styles.active : ''}`}
								onClick={() => handleItemClick('home')}
							>
								<Link to='/'>
									<i className='fa fa-home' aria-hidden='true'></i> <span>Home</span>
								</Link>
							</li>
							<li
								className={`navItem ${activeItem === 'favourite' ? styles.active : ''}`}
								onClick={() => handleItemClick('favourite')}
							>
								<Link to='/Favourite'>
									<i className='fa fa-heart' aria-hidden='true'></i>
									<span>Favourite</span>
								</Link>
							</li>
							<li
								className={`navItem ${activeItem === 'createCar' ? styles.active : ''}`}
								onClick={() => handleItemClick('createCar')}
							>
								<Link to='/create-car'>
									<i className='fa fa-star' aria-hidden='true'></i>
									<span>Create Car</span>
								</Link>
							</li>
							<li
								className={`navItem ${activeItem === 'logOut' ? styles.active : ''}`}
								onClick={() => {
									handleItemClick('logOut')
									setUser(null)
								}}
							>
								<Link to='#'>
									<i className='fa fa-sign-out' aria-hidden='true'></i>
									<span>Log Out</span>
								</Link>
							</li>
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
