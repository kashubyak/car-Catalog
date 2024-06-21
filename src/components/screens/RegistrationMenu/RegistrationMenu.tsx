import { Switch } from 'components/ui/header/searchForm/switcher/Switch'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useForm } from 'react-hook-form'
import { FormData } from 'types/user.interface'
import './RegistrationMenu.css'

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
		<>
			<div className='switch'>
				<Switch />
			</div>
			<form className='formCon' onSubmit={handleSubmit(handleLogin)}>
				{user ? null : (
					<div className='ring'>
						<i></i>
						<i></i>
						<i></i>
						<div className='login'>
							<h2>Login</h2>
							<div className='inputBx'>
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
									<div style={{ color: '#f00', fontSize: '20px' }}>
										{errors?.name?.message}
									</div>
								)}
							</div>
							<div className='inputBx'>
								<input type='submit' value='Sign in' />
							</div>
							{/* <div className='links'>
							<a href='#'>Forget Password</a>
							<a href='#'>Signup</a>
						</div> */}
						</div>
					</div>
				)}
			</form>
		</>
	)
}
export { RegistrationMenu }
