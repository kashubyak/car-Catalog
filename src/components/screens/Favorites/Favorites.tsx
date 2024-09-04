import { CarItem } from 'components/screens/home/main/ItemCar/СarItem'
import { Header } from 'components/ui/header/Header'
import { Loading } from 'components/ui/loading/Loading'
import { MenuLinks } from 'components/ui/navBar/menuLinks/MenuLinks'
import { useFavorites } from 'hooks/useFavorites'
import { FC, useState } from 'react'
import { ISideBarState } from 'types/content.interface'
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
				<div className='container'>
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
						<Loading text='There are no items "Favorite"' />
					)}
				</div>
			</div>
		</div>
	)
}
export { Favorites }
