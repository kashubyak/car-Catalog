import parce from 'html-react-parser'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICarItem } from 'types/car.interface'
import homeStyle from './CarItem.module.css'
import { MenuCar } from './menuCar/MenuCar'
import { CarItemPrice } from './СarItemPrice'

const CarItem: FC<ICarItem> = ({ car, active, onToggle }) => {
	const [loaded, setLoaded] = useState(false)
	const handleMenuToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		onToggle()
	}
	const truncateText = (text: string, maxLen: number) => {
		if (text?.length <= maxLen) return text
		return text?.substring(0, maxLen) + '...'
	}

	return (
		<div key={car.id} className={homeStyle.card}>
			<div className={homeStyle.imageContainer}>
				<img
					src={car.image}
					alt='Car Image'
					className={`${homeStyle.imgFluid} ${loaded ? homeStyle.loaded : ''}`}
					onLoad={() => setLoaded(true)}
				/>
			</div>
			<div className={homeStyle.info}>
				<div className={`${homeStyle.dFlex} ${homeStyle.topContentCard}`}>
					<h4 className={homeStyle.carTitle}>
						{car.name ? `${car.name} ${car.model}` : 'There is no name'}
					</h4>
					<i
						onClick={handleMenuToggle}
						className='fa fa-ellipsis-horizontal'
						aria-hidden='true'
					/>
					<MenuCar active={active} car={car} />
				</div>
				<div className={homeStyle.averageContentCard}>
					<p className={homeStyle.descriptionCar}>
						{parce(truncateText(car.description, 100))}
					</p>
				</div>
				<div className={`${homeStyle.bottomContentCard} ${homeStyle.dFlex}`}>
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
