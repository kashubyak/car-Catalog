import homeStyle from 'components/screens/home/main/ItemCar/CarItem.module.css'
import { Header } from 'components/ui/header/Header'
import { useFavorites } from 'hooks/useFavorites'
import { FC, useState } from 'react'
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
		<div>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
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
