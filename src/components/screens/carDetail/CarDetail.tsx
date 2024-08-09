import { CarItemPrice } from 'components/screens/home/main/ItemCar/СarItemPrice'
import parce from 'html-react-parser'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from 'services/car.service'
import { ICar } from 'types/car.interface'
import styles from './carDetail.module.css'

const CarDetail = () => {
	const { id } = useParams()
	const [car, setCar] = useState<ICar>({} as ICar)
	useEffect(() => {
		if (!id) return
		const fetchData = async () => {
			const data = await CarService.getById(id)
			setCar(data)
		}
		fetchData()
	}, [id])
	if (!car?.id) return <p>Car Not Found....</p>

	return (
		<>
			<Link className={styles.backLink} to='/'>
				<i className='fa fa-angle-left' aria-hidden='true' /> <span>Back</span>
			</Link>
			<div className={styles.contentCar}>
				<div className={styles.imageCar}>
					<img src={car.image} alt='Image Car' />
				</div>
				<div className={styles.textCar}>
					<div className={styles.textCarHeader}>
						<h3 className={styles.nameCar}>{car.name + ' ' + car.model}</h3>
						<h3 className={styles.priceCar}>
							<CarItemPrice price={car.price} />
						</h3>
					</div>
					<p className={styles.descriptionCar}>{parce(car.description)}</p>
				</div>
			</div>
		</>
	)
}
export { CarDetail }
