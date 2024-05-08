import { Link } from 'react-router-dom'
import { ICar } from 'types/car.interface'
import homeStyle from './carItem.module.css'
import { CarItemPrice } from './СarItemPrice'

const CarItem = ({ car }: { car: ICar }) => {
	return (
		<div key={car.id} className={homeStyle.card}>
			<img src={car.image} alt='Car Image' className={homeStyle.imgFluid} />

			<div className={homeStyle.info}>
				<h4 className={homeStyle.carTitle}>
					{car.name ? `${car.name} ${car.model}` : 'There is no name'}
				</h4>
				<div className={`${homeStyle.otherInfoCard} ${homeStyle.dFlex}`}>
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
