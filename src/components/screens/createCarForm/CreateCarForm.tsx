import { Header } from 'components/ui/header/Header'
import { useActions } from 'hooks/useActions'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ICar, ICarData } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import { useCreateCar } from '../../../hooks/useCreateCar'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import { CarItem } from '../home/main/ItemCar/СarItem'
import { Editor } from './textEditor/Editor'
import styles from './СreateCarForm.module.css'

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
		createCar(data)
		addNotification({
			message: 'The car is created!',
			backgroundColor: 'var(--col-popup-gr)',
		})
	}
	const car = watch()
	return (
		<div className={styles.container}>
			{/* @ts-ignore */}
			<Header />
			<div className={styles.dFlex}>
				{/* @ts-ignore */}
				<MenuLinks activeMenuItem={activeMenuItem} />
				<div className={styles.containerContent}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('name', {
									required: 'Please enter a valid name',
									pattern: {
										value:
											/^[А-ЯІЇЄҐа-яіїєґA-Za-z0-9\s-]+(['’][А-ЯІЇЄҐа-яіїєґA-Za-z0-9\s-]+)?$/,
										message: '',
									},
								})}
								placeholder='Name car'
							/>
							{errors?.name && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true'></i>
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
										message: '',
									},
								})}
								placeholder='Model'
							/>
							{errors?.model?.message && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true'></i>
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
										message: '',
									},
								})}
								placeholder='Price'
							/>
							{errors?.price?.message && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true'></i>
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
										message: '',
									},
								})}
								placeholder='Image (URL)'
							/>
							{errors?.image?.message && (
								<div className={styles.errorMessage}>
									<i className='fa fa-ban' aria-hidden='true'></i>
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
