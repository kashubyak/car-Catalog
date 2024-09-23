import { CarItem } from 'components/screens/Home/Main/ItemCar/СarItem'
import { Header } from 'components/ui/Header/Header'
import { Loading } from 'components/ui/Loading/Loading'
import { MenuLinks } from 'components/ui/NavBar/MenuLinks/MenuLinks'
import { useFavorites } from 'hooks/useFavorites'
import { FC, useCallback, useState } from 'react'
import { ISideBarState } from 'types/content.interface'
import styles from './Favorites.module.css'

const Favorites: FC<ISideBarState> = ({ activeMenuItem }) => {
	const { favorites } = useFavorites()
	const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null)
	const handleMenuIndex = useCallback((index: number) => {
		setActiveMenuIndex(prevIndex => (prevIndex === index ? null : index))
	}, [])
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
