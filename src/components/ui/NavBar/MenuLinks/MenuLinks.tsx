import { Switch } from 'components/ui/Header/SearchForm/Switch/Switch'
import { useActions } from 'hooks/useActions'
import { useFavorites } from 'hooks/useFavorites'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { ISideBarState } from 'types/content.interface'
import styles from './MenuLinks.module.css'

const MenuLinks: React.FC<ISideBarState> = ({ activeMenuItem }) => {
	const [activeItem, setActiveItem] = useState<string>(activeMenuItem)
	const handleItemClick = (item: string) => {
		setActiveItem(item)
	}
	const open = useTypedSelector(state => state.burger.open)
	const { setUser, setClose } = useActions()
	const navigate = useNavigate()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 600) {
				if (
					open &&
					!(event.target as HTMLElement).closest(`.${styles.containerLinks}`) &&
					!(event.target as HTMLElement).closest('.navTrigger')
				) {
					setClose()
				}
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [open, setClose])

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
									<i className='fa fa-home' aria-hidden='true' /> <span>Home</span>
								</li>
							</Link>
							<Link to='/favorite'>
								<li
									style={{ position: 'relative' }}
									className={`navItem ${activeItem === 'favorite' ? styles.active : ''}`}
									onClick={() => handleItemClick('favorite')}
								>
									<i className='fa fa-heart' aria-hidden='true' />
									<span>Favorite</span>
									<span className={styles.scoreFav}>{favorites.length}</span>
								</li>
							</Link>
							<Link to='/create-car'>
								<li
									className={`navItem ${activeItem === 'createCar' ? styles.active : ''}`}
									onClick={() => handleItemClick('createCar')}
								>
									<i className='fa fa-star' aria-hidden='true' />
									<span>Create Car</span>
								</li>
							</Link>
							<Link to='/promotion-video'>
								<li
									className={`navItem ${
										activeItem === 'promotionVideo' ? styles.active : ''
									}`}
									onClick={() => handleItemClick('promotionVideo')}
								>
									<i className='fa fa-video-camera' aria-hidden='true' />
									<span>Promotion</span>
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
									<i className='fa fa-sign-out' aria-hidden='true' />
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
