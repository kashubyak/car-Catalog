import parce from 'html-react-parser'
import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICarItem } from 'types/car.interface'
import homeStyle from './CarItem.module.css'
import { MenuCar } from './MenuCar/MenuCar'
import { CarItemPrice } from './СarItemPrice'

const CarItem: FC<ICarItem> = ({ car, active, onToggle }) => {
	const imgRef = useRef<HTMLImageElement | null>(null)
	const [isIntersecting, setIsIntersecting] = useState(false)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsIntersecting(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.1, rootMargin: '100px' },
		)

		if (imgRef.current) {
			observer.observe(imgRef.current)
		}

		return () => {
			if (imgRef.current) {
				observer.unobserve(imgRef.current)
			}
		}
	}, [])

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
					ref={imgRef}
					src={isIntersecting ? car.image : ''}
					alt='Car Image'
					className={`${homeStyle.imgFluid} ${loaded ? homeStyle.loaded : ''}`}
					onLoad={() => setLoaded(true)}
				/>
			</div>
			<div className={homeStyle.info}>
				<div className={`${homeStyle.dFlex} ${homeStyle.topContentCard}`}>
					<h4 className={homeStyle.carTitle}>
						{car.name ? `${car.name} ${car.model}` : 'Car name and model'}
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
						{car.description ? parce(truncateText(car.description, 100)) : '...'}
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
