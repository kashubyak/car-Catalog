import { ThemeContext } from 'providers/ThemeProvides'
import { useContext } from 'react'
import styles from './switsh.module.css'

const Switch = () => {
	const { theme, setTheme } = useContext(ThemeContext)
	const changeTheme = () => {
		setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
	}
	return (
		<label className={`${styles.switch}`}>
			<input id='checkbox' type='checkbox' onChange={changeTheme} />
			<span className={`${styles.slider} ${styles.round}`}></span>
		</label>
	)
}
export { Switch }
