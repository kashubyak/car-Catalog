import homeStyle from 'components/screens/home/main/ItemCar/carItem.module.css'
import { CarItem } from 'components/screens/home/main/ItemCar/СarItem'
import { FC } from 'react'
import { ICar } from 'types/car.interface'
interface iCatalog {
	data?: ICar[]
}
const Catalog: FC<iCatalog> = ({ data = [] }) => {
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
export { Catalog }
