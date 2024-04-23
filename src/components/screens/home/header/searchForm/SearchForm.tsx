import { useContext } from 'react'
import styles from './SearchForm.module.css'
import { ThemeContext } from 'providers/ThemeProvides'
const SearchForm = () => {
	const { theme, setTheme } = useContext(ThemeContext)
	const changeTheme = () => {
		setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
	}
	return (
		<form className={`${styles.dFlex}`}>
			<i className='fi fi-rs-moon'></i>
			<div className={styles.searchIcon}>
				<input
					className={styles.formControl}
					type='search'
					placeholder='Search'
					aria-label='Search'
				/>
			</div>
			<label className={`${styles.switch}`}>
				<input id='checkbox' type='checkbox' onChange={changeTheme} />
				<span className={`${styles.slider} ${styles.round}`}></span>
			</label>
		</form>
	)
}
export { SearchForm }
