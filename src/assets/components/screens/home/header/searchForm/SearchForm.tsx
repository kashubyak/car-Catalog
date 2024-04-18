import { useContext } from 'react'
import { ThemeContext } from '../../../../../hooks/providers/ThemeProvides'
import styles from './SearchForm.module.css'
const SearchForm = () => {
	const { theme, setTheme } = useContext(ThemeContext)
	const changeTheme = () => {
		setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
	}
	return (
		<form
			className={`${styles.dFlex} ${styles.justifyContentEnd} ${styles.alignItemsCenter}`}
		>
			<i className='fi fi-rs-moon'></i>
			<div className={styles.searchIcon}>
				<i className={`${styles.fa} ${styles.faSearch}`} aria-hidden='true'></i>
				<input
					className={styles.formControl}
					type='search'
					placeholder='Search'
					aria-label='Search'
				/>
			</div>
			<label className={`${styles.switch} ${styles.flexShrink0} ${styles.mb0}`}>
				<input id='checkbox' type='checkbox' onChange={changeTheme} />
				<span className={`${styles.slider} ${styles.round}`}></span>
			</label>
		</form>
	)
}
export { SearchForm }
