import homeStyle from 'components/screens/home/main/ItemCar/CarItem.module.css'
import { Header } from 'components/ui/header/Header'
import { MenuLinks } from 'components/ui/navBar/menuLinks/MenuLinks'
import { FC } from 'react'
import { ISideBarState } from 'types/content.interface'
import styles from './PromotionVideo.module.css'
import { VideoElement } from './VideoElement'

const PromotionVideo: FC<ISideBarState> = ({ activeMenuItem }) => {
	return (
		<div>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className={homeStyle.container}>
					<VideoElement />
				</div>
			</div>
		</div>
	)
}
export { PromotionVideo }
