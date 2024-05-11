import styles from './SearchForm.module.css'
import { Switch } from './switcher/Switch'
const SearchForm = () => {
	return (
		<form className={`${styles.dFlex}`}>
			<div className={styles.searchIcon}>
				<input
					className={styles.formControl}
					type='search'
					placeholder='Search'
					aria-label='Search'
				/>
			</div>
			<div className={styles.switchTheme}>
				<Switch />
			</div>
		</form>
	)
}
export { SearchForm }
