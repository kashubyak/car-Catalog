import styles from './Header.module.css'
import { HamburgerIcon } from './hamburgerIcon/HamburgerIcon'
import { HeaderUser } from './headerUser/HeaderUser'
import { SearchForm } from './searchForm/SearchForm'

const Header = () => {
	return (
		<nav className={`${styles.navbar} ${styles.dFlex}`}>
			<p className={`${styles.navbarBrand}`}>Car Catalog</p>
			<HamburgerIcon />
			<div className={`${styles.headerContent}  ${styles.dFlex}`}>
				<SearchForm />
				<HeaderUser />
			</div>
		</nav>
	)
}

export { Header }
