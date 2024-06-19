import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import styles from './Switsh.module.css'

const Switch = () => {
	const { setTheme } = useActions()
	const theme = useTypedSelector(state => state.theme.theme)

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
