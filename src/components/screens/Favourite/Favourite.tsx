import { FC } from 'react'
import { ISideBarState } from 'types/content.interface'
import { Header } from '../home/header/Header'
import { MenuLinks } from '../home/main/navBar/menuLinks/MenuLinks'
import styles from './favorites.module.css'
const Favourite: FC<ISideBarState> = ({ setActiveMenuItem, activeMenuItem }) => {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.dFlex}>
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className={styles.con}>Favourite</div>
			</div>
		</div>
	)
}
export { Favourite }
