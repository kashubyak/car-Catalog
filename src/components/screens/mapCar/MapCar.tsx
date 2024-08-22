import { Header } from 'components/ui/header/Header'
import { MenuLinks } from 'components/ui/navBar/menuLinks/MenuLinks'
import { FC } from 'react'
import { ISideBarState } from 'types/content.interface'
import styles from './MapCar.module.css'

const MapCar: FC<ISideBarState> = ({ activeMenuItem }) => {
	return (
		<div>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className='container'></div>
			</div>
		</div>
	)
}
export { MapCar }
