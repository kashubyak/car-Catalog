import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICarItem } from 'types/car.interface'
import homeStyle from './carItem.module.css'
import { CarItemPrice } from './СarItemPrice'

const CarItem: FC<ICarItem> = ({ car, active, onToggle }) => {
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

	const handleMenuToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		onToggle()
	}

	return (
		<div key={car.id} className={homeStyle.card}>
			<img src={car.image} alt='Car Image' className={homeStyle.imgFluid} />

			<div className={homeStyle.info}>
				<div className={`${homeStyle.dFlex} ${homeStyle.topContentCard}`}>
					<h4 className={homeStyle.carTitle}>
						{car.name ? `${car.name} ${car.model}` : 'There is no name'}
					</h4>
					<i
						onClick={handleMenuToggle}
						className='fa fa-ellipsis-horizontal'
						aria-hidden='true'
					></i>
					<div
						ref={menuRef}
						className={`${homeStyle.menu} ${menuActive ? homeStyle.active : ''}`}
					>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
				</div>
				<div className={`${homeStyle.downInfoCard} ${homeStyle.dFlex}`}>
					<Link to={`/car/${car.id}`} className='btn'>
						Read more
					</Link>
					<CarItemPrice price={car.price} />
				</div>
			</div>
		</div>
	)
}

export { CarItem }
