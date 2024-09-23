import { CarItemPrice } from 'components/screens/Home/Main/ItemCar/СarItemPrice'
import { HttpError } from 'components/screens/HttpError/HttpError'
import { Loading } from 'components/ui/Loading/Loading'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import parce from 'html-react-parser'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from 'services/car.service'
import { ICar } from 'types/car.interface'
import styles from './carDetail.module.css'

const CarDetail = () => {
	const { id } = useParams()
	const [car, setCar] = useState<ICar>({} as ICar)
	const [loaded, setLoaded] = useState(false)
	const isLoading = useTypedSelector(state => state.loading.isLoading)
	const { startLoading, stopLoading } = useActions()

	useEffect(() => {
		if (!id) return
		const fetchData = async () => {
			startLoading()
			setLoaded(false)
			try {
				const data = await CarService.getById(id)
				setCar(data)
			} catch (error) {
				console.error(error)
			} finally {
				stopLoading()
				setLoaded(true)
			}
		}
		fetchData()
	}, [id, startLoading, stopLoading])

	if (isLoading) return <Loading text={'Loading...'} />
	if (!car?.id && loaded) return <HttpError code={404} title='404' />

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
					<p className={styles.descriptionCar}>
						{typeof car.description === 'string' ? parce(car.description) : ' '}
					</p>
				</div>
			</div>
		</>
	)
}
export { CarDetail }
