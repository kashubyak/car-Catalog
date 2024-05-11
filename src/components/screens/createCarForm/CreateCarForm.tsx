import { Header } from 'components/ui/header/Header'
import { FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { ICar, ICarData } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import { MenuLinks } from '../../ui/navBar/menuLinks/MenuLinks'
import { CarItem } from '../home/main/ItemCar/СarItem'
import styles from './createCarForm.module.css'
import { useCreateCar } from './useCreateCar'

const CreateCarForm: FC<ISideBarState> = ({ activeMenuItem }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ICarData>({ mode: 'onChange' })
	const { createCar } = useCreateCar(reset)

	const onSubmit = (data: ICarData) => {
		createCar(data)
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
								{...register('name', { required: 'Name is required' })}
								placeholder='Name car'
							/>
							{errors?.name?.message && <p style={{ color: '#f00' }}>Name is required</p>}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('model', { required: 'Model is required' })}
								placeholder='Model'
							/>
							{errors?.model?.message && (
								<p style={{ color: '#f00' }}>Model is required</p>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('price', { required: 'Price is required' })}
								placeholder='Price'
							/>
							{errors?.price?.message && (
								<p style={{ color: '#f00' }}>Price is required</p>
							)}
						</span>
						<span className={styles.inputCon}>
							<input
								className='BaseInput'
								{...register('image', { required: 'Image is required' })}
								placeholder='Image'
							/>
							{errors?.image?.message && (
								<p style={{ color: '#f00' }}>Image is required</p>
							)}
						</span>
						<button className='btn'>Create</button>
					</form>
					<div className={styles.card}>
						<CarItem car={car as ICar} />
					</div>
				</div>
			</div>
		</div>
	)
}

export { CreateCarForm }
