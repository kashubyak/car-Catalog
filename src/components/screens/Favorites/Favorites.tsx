import { Header } from 'components/ui/header/Header'
import { FC, SetStateAction } from 'react'
import { ISideBarState } from 'types/content.interface'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import styles from './Favorites.module.css'
const Favorites: FC<ISideBarState> = ({ activeMenuItem }) => {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.dFlex}>
				<MenuLinks
					activeMenuItem={activeMenuItem}
					setActiveMenuItem={function (value: SetStateAction<string>): void {
						throw new Error('Function not implemented.')
					}}
				/>
				<div className={styles.con}>Favourite</div>
			</div>
		</div>
	)
}
export { Favorites }
