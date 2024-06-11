import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICarItem } from 'types/car.interface'
import homeStyle from './CarItem.module.css'
import { MenuCar } from './menuCar/MenuCar'
import { CarItemPrice } from './СarItemPrice'

const CarItem: FC<ICarItem> = ({ car, active, onToggle }) => {
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
					<MenuCar active={active} car={car} />
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
