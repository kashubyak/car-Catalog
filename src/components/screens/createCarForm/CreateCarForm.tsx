import React from 'react'
import { useForm } from 'react-hook-form'
import { ICarData } from 'types/car.interface'
import { Header } from '../home/header/Header'
import { MenuLinks } from '../home/main/navBar/menuLinks/MenuLinks'
import styles from './createCarForm.module.css'
import { useCreateCar } from './useCreateCar'

interface Props {
	setActiveMenuItem: React.Dispatch<React.SetStateAction<string>>
	activeMenuItem: string
}

const CreateCarForm: React.FC<Props> = ({ setActiveMenuItem, activeMenuItem }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICarData>({ mode: 'onChange' })
	const { createCar } = useCreateCar(reset)

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.dFlex}>
				<MenuLinks activeMenuItem={activeMenuItem} />
				<form className={styles.form} onSubmit={handleSubmit(createCar)}>
					<input
						{...register('name', { required: 'Name is required' })}
						placeholder='Name car'
					/>
					{errors?.name?.message && <p style={{ color: '#f00' }}>Name is required</p>}
					<input
						{...register('model', { required: 'Model is required' })}
						placeholder='Model'
					/>
					{errors?.model?.message && <p style={{ color: '#f00' }}>Model is required</p>}
					<input
						{...register('price', { required: 'Price is required' })}
						placeholder='Price'
					/>
					{errors?.price?.message && <p style={{ color: '#f00' }}>Price is required</p>}
					<input
						{...register('image', { required: 'Image is required' })}
						placeholder='Image'
					/>
					{errors?.image?.message && <p style={{ color: '#f00' }}>Image is required</p>}
					<button className='btn'>Create</button>
				</form>
			</div>
		</div>
	)
}

export { CreateCarForm }
