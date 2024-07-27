import homeStyle from 'components/screens/home/main/ItemCar/CarItem.module.css'
import { Header } from 'components/ui/header/Header'
import { useFavorites } from 'hooks/useFavorites'
import { FC, SetStateAction, useState } from 'react'
import { ICar } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import { CarItem } from '../home/main/ItemCar/СarItem'
import styles from './Favorites.module.css'

const Favorites: FC<ISideBarState> = ({ activeMenuItem }) => {
	const { favorites } = useFavorites()
	const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null)
	const handleMenuIndex = (index: number) => {
		setActiveMenuIndex(prevIndex => (prevIndex === index ? null : index))
	}
	return (
		<div className={styles.container}>
			<Header
				onFilter={function (filteredData: ICar[]): void {
					throw new Error('Function not implemented.')
				}}
				data={[]}
			/>
			<div className={styles.dFlex}>
				<MenuLinks
					activeMenuItem={activeMenuItem}
					setActiveMenuItem={function (value: SetStateAction<string>): void {
						throw new Error('Function not implemented.')
					}}
				/>
				<div className={homeStyle.container}>
					{favorites.length ? (
						favorites.map((car, index) => (
							<CarItem
								key={car.id}
								car={car}
								active={activeMenuIndex === index}
								onToggle={() => handleMenuIndex(index)}
							/>
						))
					) : (
						<div>There are no items 'Favorite'</div>
					)}
				</div>
			</div>
		</div>
	)
}
export { Favorites }
