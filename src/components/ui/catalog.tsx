import { CarItem } from 'components/screens/home/main/ItemCar/СarItem'
import { FC } from 'react'
import { ICar } from 'types/car.interface'
import homeStyle from '../screens/home/main/ItemCar/carItem.module.css'
interface iCatalog {
	data?: ICar[]
}
const Catalog: FC<iCatalog> = ({ data = [] }) => {
	return (
		<div className={homeStyle.container} style={{ padding: '0px 15px' }}>
			{data.length ? (
				data.map(car => <CarItem key={car.id} car={car} />)
			) : (
				<p>There are no cars</p>
			)}
		</div>
	)
}
export { Catalog }
