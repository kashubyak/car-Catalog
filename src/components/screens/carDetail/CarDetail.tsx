import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from 'services/car.service'
import { ICar } from 'types/car.interface'
import { CarItem } from '../home/main/ItemCar/СarItem'

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
	if (!car?.name) return <p>Car Not Found....</p>

	return (
		<div>
			<Link className='btn' to='/'>
				back
			</Link>
			<CarItem
				car={car}
				active={false}
				onToggle={function (): void {
					throw new Error('Function not implemented.')
				}}
			/>
		</div>
	)
}
export default CarDetail
