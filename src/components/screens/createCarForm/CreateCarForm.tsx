import { ChangeEvent, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ICar, ICarData } from 'types/car.interface'
import { ISideBarState } from 'types/content.interface'
import { Header } from '../home/header/Header'
import { CarItem } from '../home/main/ItemCar/СarItem'
import { MenuLinks } from '../home/main/navBar/menuLinks/MenuLinks'
import styles from './createCarForm.module.css'
import { useCreateCar } from './useCreateCar'

const CreateCarForm: FC<ISideBarState> = ({ activeMenuItem }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICarData>({ mode: 'onChange' })
	const { createCar } = useCreateCar(reset)

	const [car, setCar] = useState<ICar>({} as ICar)
	const onSubmit = (data: ICarData) => {
		setCar(data as ICar)
		createCar(data)
	}
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setCar(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

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
						<input
							{...register('name', { required: 'Name is required' })}
							placeholder='Name car'
							onChange={handleInputChange}
						/>
						{errors?.name?.message && <p style={{ color: '#f00' }}>Name is required</p>}
						<input
							{...register('model', { required: 'Model is required' })}
							placeholder='Model'
							onChange={handleInputChange}
						/>
						{errors?.model?.message && <p style={{ color: '#f00' }}>Model is required</p>}
						<input
							{...register('price', { required: 'Price is required' })}
							placeholder='Price'
							onChange={handleInputChange}
						/>
						{errors?.price?.message && <p style={{ color: '#f00' }}>Price is required</p>}
						<input
							{...register('image', { required: 'Image is required' })}
							placeholder='Image'
							onChange={handleInputChange}
						/>
						{errors?.image?.message && <p style={{ color: '#f00' }}>Image is required</p>}
						<button className='btn'>Create</button>
					</form>
					<div className={styles.card}>
						<CarItem car={car} />
					</div>
				</div>
			</div>
		</div>
	)
}

export { CreateCarForm }
