import React from 'react'
import { Link } from 'react-router-dom'
import { ICar } from '../../../../../types/car.interface'
import homeStyle from '../carItem.module.css'
import CarItemPrice from './carItemPrice.js'

const CarItem = ({ car }: { car: ICar }) => {
	return (
		<div key={car.id} className={homeStyle.borBlock}>
			<div
				className={homeStyle.image}
				style={{
					backgroundImage: `url(${car.image})`,
				}}
			></div>
			<div className={homeStyle.info}>
				<h2>{car.name}</h2>
				<CarItemPrice price={car.price} />
				<Link to={`/car/${car.id}`} className='btn'>
					Read more
				</Link>
			</div>
		</div>
	)
}
export default React.memo(CarItem)
