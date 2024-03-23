import { FC } from 'react'
import { ICar } from '../../../types/car.interface'
import homeStyle from '../screens/home/carItem.module.css'
import CarItem from '../screens/home/itemCar/carItem'
interface iCatalog {
	data?: ICar[]
}
export const Catalog: FC<iCatalog> = ({ data = [] }) => {
	return (
		<div className={homeStyle.flexParent}>
			{data.length ? (
				data.map(car => <CarItem key={car.id} car={car} />)
			) : (
				<p>There are no cars</p>
			)}
		</div>
	)
}
