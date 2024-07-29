import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ISearchFormProps } from 'types/content.interface'
import styles from './Header.module.css'
import { HamburgerIcon } from './hamburgerIcon/HamburgerIcon'
import { HeaderUser } from './headerUser/HeaderUser'
import { SearchForm } from './searchForm/SearchForm'

const Header: FC<ISearchFormProps> = ({ onFilter, data }) => {
	return (
		<nav className={`${styles.navbar} ${styles.dFlex}`}>
			<Link className={styles.navbarBrand} to='/'>
				Car Catalog
			</Link>
			<HamburgerIcon />
			<div className={`${styles.headerContent}  ${styles.dFlex}`}>
				<SearchForm onFilter={onFilter} data={data} />
				<HeaderUser />
			</div>
		</nav>
	)
}

export { Header }
