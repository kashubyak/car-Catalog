import { Switch } from 'components/ui/header/searchForm/switcher/Switch'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useForm } from 'react-hook-form'
import { FormData } from 'types/user.interface'
import styles from './RegistrationMenu.module.css'

const RegistrationMenu = () => {
	const { setUser } = useActions()
	const user = useTypedSelector(state => state.user.user)
	if (user) return null
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onChange' })

	const handleLogin = (data: FormData) => {
		setUser({ name: data.name })
		reset()
	}

	return (
		<>
			<div className={styles.switch}>
				<Switch />
			</div>
			<form className={styles.formCon} onSubmit={handleSubmit(handleLogin)}>
				{user ? null : (
					<div className={styles.ring}>
						<i></i>
						<i></i>
						<i></i>
						<div className={styles.login}>
							<h2>Login</h2>
							<div className={styles.inputBx}>
								<input
									type='text'
									placeholder='Username'
									{...register('name', {
										required: 'Please enter your name',
										pattern: {
											value:
												/^[А-ЯІЇЄҐа-яіїєґA-Za-z]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z]+)?([-][|{ А-ЯІЇЄҐа-яіїєґA-Za-z]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z]+)?)?$/,
											message: 'Please enter a valid name',
										},
									})}
								/>
								{errors?.name?.message && (
									<div style={{ color: '#f00', fontSize: '1.25rem' }}>
										{errors?.name?.message}
									</div>
								)}
							</div>
							<div className={styles.inputBx}>
								<input type='submit' value='Sign in' />
							</div>
						</div>
					</div>
				)}
			</form>
		</>
	)
}
export { RegistrationMenu }
