import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useForm } from 'react-hook-form'
import { FormData } from 'types/user.interface'

const RegistrationMenu = () => {
	const { setUser } = useActions()
	const user = useTypedSelector(state => state.user.user)

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
		<form action='' onSubmit={handleSubmit(handleLogin)}>
			{user ? (
				<></>
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
export { RegistrationMenu }
