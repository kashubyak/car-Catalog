import { Header } from 'components/ui/header/Header'
import { useActions } from 'hooks/useActions'
import { FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { ICar, ICarData } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import { CarItem } from '../home/main/ItemCar/СarItem'
import { useCreateCar } from './useCreateCar'
import styles from './СreateCarForm.module.css'

const CreateCarForm: FC<ISideBarState> = ({ activeMenuItem }) => {
	const {
		reset,
		register,
		handleSubmit,
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
			<Header />
			<div className={styles.dFlex}>
				<MenuLinks
					activeMenuItem={activeMenuItem}
					setActiveMenuItem={function (value: SetStateAction<string>): void {
						throw new Error('Function not implemented.')
					}}
				/>
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
							{errors?.name && <p style={{ color: '#f00' }}>{errors?.name?.message}</p>}
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
								<p style={{ color: '#f00' }}>Model is required</p>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('price', {
									required: 'Please enter a valid price',
									pattern: {
										value: /^\d+(\.\d{0,12})?$/,
										message: '',
									},
								})}
								placeholder='Price'
							/>
							{errors?.price?.message && (
								<p style={{ color: '#f00' }}>Price is required</p>
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
								<p style={{ color: '#f00' }}>Image is required</p>
							)}
						</span>
						<button className='btn'>Create</button>
					</form>
					<div className={styles.card}>
						<CarItem
							car={car as ICar}
							active={false}
							onToggle={function (): void {
								throw new Error('Function not implemented.')
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export { CreateCarForm }
