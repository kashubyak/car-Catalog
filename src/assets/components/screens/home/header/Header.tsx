import styles from './Header.module.css'
import { HamburgerIcon } from './hamburgerIcon/HamburgerIcon'
import { HeaderUser } from './headerUser/HeaderUser'
import { SearchForm } from './searchForm/SearchForm'

const Header = () => {
	return (
		<div className={styles.containerFluid}>
			<nav className={`${styles.navbar} ${styles.navbarExpandLg} ${styles.navbarLight}`}>
				<div className={`${styles.headerInner} ${styles.dFlex}`}>
					<p className={`${styles.navbarBrand}`}>Car Catalog</p>
					<div className={`${styles.headerContent} ${styles.dFlex}`}>
						<SearchForm />
						<HamburgerIcon />
						<HeaderUser />
					</div>
				</div>
			</nav>
		</div>
	)
}

export { Header }
