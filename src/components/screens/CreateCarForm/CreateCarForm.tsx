import { CarItem } from 'components/screens/Home/Main/ItemCar/СarItem'
import { Header } from 'components/ui/Header/Header'
import { MenuLinks } from 'components/ui/NavBar/MenuLinks/MenuLinks'
import { useActions } from 'hooks/useActions'
import { useCreateCar } from 'hooks/useCreateCar'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ICar, ICarData } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import styles from './CreateCarForm.module.css'
import { Editor } from './TextEditor/Editor'

const CreateCarForm: FC<ISideBarState> = ({ activeMenuItem }) => {
	const {
		reset,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<ICarData>({ mode: 'onChange' })
	const { createCar } = useCreateCar(reset)
	const { addNotification } = useActions()
	const onSubmit = (data: ICarData) => {
		if (!car.description) {
			data.description === '...'
		}
		createCar(data)
		addNotification({
			message: 'The car is created!',
			backgroundColor: 'var(--col-popup-gr)',
		})
	}
	const car = watch()

	return (
		<div>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className='container'>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('name', {
									required: 'Please enter a valid name',
									pattern: {
										value:
											/^[А-ЯІЇЄҐа-яіїєґA-Za-z0-9\s-]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z0-9\s-]+)?$/,
										message: 'Please enter a valid name',
									},
								})}
								placeholder='Name car'
							/>
							{errors?.name && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true' />
									<p>{errors?.name?.message}</p>
								</div>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('model', {
									required: 'Please enter a valid model',
									pattern: {
										value: /^[A-Za-z0-9\s-]+$/,
										message: 'Please enter a valid mode',
									},
								})}
								placeholder='Model'
							/>
							{errors?.model && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true' />
									<p>{errors?.model?.message}</p>
								</div>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('price', {
									required: 'Please enter a valid price',
									pattern: {
										value: /^[0-9]+(\.[0-9]{1,2})?$/,
										message: 'Please enter a valid price',
									},
								})}
								placeholder='Price'
							/>
							{errors?.price && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true' />
									<p>{errors?.price?.message}</p>
								</div>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('image', {
									required: 'Please enter a valid URL',
									pattern: {
										value: /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
										message: 'Please enter a valid URL',
									},
								})}
								placeholder='Image (URL)'
							/>
							{errors?.image && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true' />
									<p>{errors?.image?.message}</p>
								</div>
							)}
						</span>
						<br />
						<span className={styles.inputCon}>
							<Editor
								text={car.description || ''}
								setText={text => setValue('description', text)}
							/>
						</span>
						<button className='btn'>Create</button>
					</form>
					<div className={styles.card}>
						{/* @ts-ignore */}
						<CarItem car={car as ICar} />
					</div>
				</div>
			</div>
		</div>
	)
}

export { CreateCarForm }
