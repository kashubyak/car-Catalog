import { useForm } from 'react-hook-form'
import { FormData } from '../../../types/user.interface'
import { useAuth } from '../../hooks/useAuth'
import styles from '../screens/home/Create-car-Form/createCarForm.module.css'

export const Header = () => {
	const { user, setUser } = useAuth()

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
		<form action='' className={styles.form} onSubmit={handleSubmit(handleLogin)}>
			{user ? (
				<>
					<h2>You are logged in! {user?.name}</h2>
					<button
						className='btn'
						onClick={() => {
							setUser(null)
						}}
					>
						Logout
					</button>
				</>
			) : (
				<div>
					<h2>Please Login</h2>
					<input
						{...register('name', {
							required: 'Please enter your name',
							pattern: {
								value:
									/^[А-ЯІЇЄҐа-яіїєґA-Za-z]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z]+)?([-][|{ А-ЯІЇЄҐа-яіїєґA-Za-z]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z]+)?)?$/,
								message: 'Please enter a valid name',
							},
						})}
						placeholder={'Input your name'}
					/>
					{errors?.name?.message && (
						<div style={{ color: '#f00', fontSize: '20px' }}>{errors?.name?.message}</div>
					)}
					<br />
					<button className='btn'>Login</button>
				</div>
			)}
		</form>
	)
}
