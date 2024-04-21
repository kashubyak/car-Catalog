import React, { useState } from 'react'
import styles from './menuLinks.module.css'

const MenuLinks = () => {
	const [activeItem, setActiveItem] = useState('home')

	const handleItemClick = (item: React.SetStateAction<string>) => {
		setActiveItem(item)
	}

	return (
		<div className={styles.menuLinks}>
			<ul>
				<li
					className={`navItem ${activeItem === 'home' ? styles.active : ''}`}
					onClick={() => handleItemClick('home')}
				>
					<a href='#'>
						<i className='fa fa-home' aria-hidden='true'></i> <span>Home</span>
					</a>
				</li>
				<li
					className={`navItem ${activeItem === 'favourite' ? styles.active : ''}`}
					onClick={() => handleItemClick('favourite')}
				>
					<a href='#'>
						<i className='fa fa-heart' aria-hidden='true'></i>
						<span>Favourite</span>
					</a>
				</li>
				<li
					className={`navItem ${activeItem === 'createCar' ? styles.active : ''}`}
					onClick={() => handleItemClick('createCar')}
				>
					<a href='#'>
						<i className='fa fa-star' aria-hidden='true'></i> <span>Create Car</span>
					</a>
				</li>
			</ul>
		</div>
	)
}

export { MenuLinks }
